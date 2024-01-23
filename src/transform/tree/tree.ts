import { Base64 } from "js-base64";
import { JewelMetaOfSize, treeNodes, jewelMetasOfSize, ExpansionJewel } from "./data.js";

const JEWEL_SLOT_NODE_IDS = [
    26725, 36634, 33989, 41263, 60735, 61834, 31683, 28475, 6230, 48768, 34483, 7960, 46882, 55190,
    61419, 2491, 54127, 32763, 26196, 33631, 21984, 29712, 48679, 9408, 12613, 16218, 2311, 22994,
    40400, 46393, 61305, 12161, 3109, 49080, 17219, 44169, 24970, 36931, 14993, 10532, 23756, 46519,
    23984, 51198, 61666, 6910, 49684, 33753, 18436, 11150, 22748, 64583, 61288, 13170, 9797, 41876,
    59585, 43670, 29914, 18060,
];

export function getNodeIdOfSlot(jewelSlotIdx: number): number {
    return JEWEL_SLOT_NODE_IDS[jewelSlotIdx];
}

const CLASSES = [
    { name: "Scion", ascendancies: ["None", "Ascendant"] },
    { name: "Marauder", ascendancies: ["None", "Juggernaut", "Berserker", "Chieftain"] },
    { name: "Ranger", ascendancies: ["None", "Raider", "Deadeye", "Pathfinder"] },
    { name: "Witch", ascendancies: ["None", "Occultist", "Elementalist", "Necromancer"] },
    { name: "Duelist", ascendancies: ["None", "Slayer", "Gladiator", "Champion"] },
    { name: "Templar", ascendancies: ["None", "Inquisitor", "Hierophant", "Guardian"] },
    { name: "Shadow", ascendancies: ["None", "Assassin", "Trickster", "Saboteur"] },
];

export function getClass(classId: number): string {
    return CLASSES[classId].name;
}

export function getAscendancy(classId: number, ascendancyId: number): string {
    return CLASSES[classId].ascendancies[ascendancyId];
}

export function getClassId(name: string): { classId: number; ascendancyId: number } | undefined {
    for (let i = 0; i < CLASSES.length; i++) {
        if (CLASSES[i].name === name) {
            return { classId: i, ascendancyId: 0 };
        }

        const ascendancies = CLASSES[i].ascendancies;
        for (let j = 1; j < ascendancies.length; j++) {
            if (ascendancies[j] === name) {
                return { classId: i, ascendancyId: j };
            }
        }
    }
    return undefined;
}

// copy from https://github.com/afq984/void-battery/blob/main/web/pobgen.py
export function getEncodedTree(char: any, tree: any) {
    const hashes: number[] = tree.hashes;
    var classIds = getClassId(char.class);
    if (classIds === undefined) {
        classIds = { classId: 0, ascendancyId: 0 };
    }
    const head: number[] = [0, 0, 0, 6, classIds.classId, classIds.ascendancyId];
    const masteryEffects: number[] = [];
    for (const [node, effect] of Object.entries<number>(tree.mastery_effects)) {
        masteryEffects.push(effect);
        masteryEffects.push(Number(node));
    }

    const buffer = new ArrayBuffer(
        head.length + 1 + hashes.length * 2 + 2 + masteryEffects.length * 2
    );
    const view = new DataView(buffer);
    var offset = 0;
    for (const n of head) {
        view.setUint8(offset, n);
        offset += 1;
    }
    view.setUint8(offset, hashes.length);
    offset += 1;
    for (const hash of hashes) {
        view.setUint16(offset, hash);
        offset += 2;
    }
    view.setUint8(offset++, 0);
    view.setUint8(offset++, masteryEffects.length / 2);
    for (const masteryEffect of masteryEffects) {
        view.setUint16(offset, masteryEffect);
        offset += 2;
    }

    let code = Base64.fromUint8Array(new Uint8Array(buffer));
    return code.replaceAll("+", "-").replaceAll("/", "_");
}

// 返回所有星团上点亮的node在POB中的nodeId（后续称为pobNodeId）
//
// 这里采用如下定义：
// slot为天赋树上的原生插槽，socket为星团珠宝提供的扩展插槽，一些情况下这两者会混用
export function enabledPobNodeIdsOfJewels(hashEx: number[], jewelData: any): number[] {
    // 获取所有jewel，并按照从大到小进行排序
    let jewelList = getSortedJewels(jewelData);

    var hashExSet = new Set(hashEx);

    // 使用skill作为key，关联所在socket的ExpansionJewel
    // id是socket所在星团的POB内部实现细节，供子星团使用
    var socketExpansionJewels = new Map<number, { id: number; ej: ExpansionJewel }>();

    var enabledPobNodeIds: number[] = [];

    for (const jewel of jewelList) {
        const idx = jewel.idx;
        const data = jewel.data;
        const size = jewel.size;

        const jewelNodes = data.subgraph.nodes;

        if (size === JEWEL_SIZE_LARGE) {
            // 大星团只可能位于slot上
            const slotNodeId = getNodeIdOfSlot(Number(idx));
            const expansionJewel = treeNodes[slotNodeId].expansionJewel;

            enabledPobNodeIds.push(
                ...enabledPobNodeIdsOfJewel(
                    hashExSet,
                    jewel,
                    expansionJewel,
                    undefined,
                    socketExpansionJewels
                )
            );
        } else if (size === JEWEL_SIZE_MEDIUM || size === JEWEL_SIZE_SMALL) {
            let expansionJewel: ExpansionJewel | undefined = undefined;
            let id: number | undefined = undefined;

            var socketSkill = getSocketSkill(jewelNodes);
            // 中小星团优先考虑可能位于socket上
            const wrapper = socketExpansionJewels.get(Number(socketSkill));
            if (wrapper !== undefined) {
                //in socket
                id = wrapper.id;
                expansionJewel = wrapper.ej;
            } else {
                //in slot
                const slotNodeId = getNodeIdOfSlot(Number(idx));
                expansionJewel = treeNodes[slotNodeId].expansionJewel;
            }

            enabledPobNodeIds.push(
                ...enabledPobNodeIdsOfJewel(
                    hashExSet,
                    jewel,
                    expansionJewel,
                    id,
                    socketExpansionJewels
                )
            );
        }
    }

    return enabledPobNodeIds;
}

function getSortedJewels(jewelData: any): { idx: string; data: any; size: string }[] {
    const jewelList: { idx: string; data: any; size: string }[] = [];
    for (const [idx, data] of Object.entries<any>(jewelData)) {
        const size = jewelSize(data.type);
        if (size !== "") {
            jewelList.push({ idx, data, size });
        }
    }

    jewelList.sort((a, b) => {
        // "LARGE"<"MEDIUM"<"SMALL", but LARGE > MEDIUM > SMALL
        if (a === b) {
            return 0;
        } else if (a > b) {
            return -1;
        } else {
            return 1;
        }
    });
    return jewelList;
}

// 返回星团所在slot的NodeId或者所在socket的Skill，即入口node的in
function getSocketSkill(jewelNodes: {
    [index: string]: { in: string[]; out: string[] };
}): string | undefined {
    for (const [_, node] of Object.entries<any>(jewelNodes)) {
        let inNodeId: string | undefined = undefined;
        if (node.in.length > 0) {
            inNodeId = node.in[0];
        }

        if (inNodeId !== undefined) {
            if (!(inNodeId in jewelNodes)) {
                return inNodeId;
            }
        }
    }
    return undefined;
}

// 返回单个星团上点亮的node的pobNodeId
// socketEJs用于返回填充数据，供子星团使用
function enabledPobNodeIdsOfJewel(
    hashExSet: Set<number>,
    jewel: { idx: string; data: any; size: string },
    expansionJewel: any,
    id: number | undefined,
    socketEJs: Map<number, { id: number; ej: ExpansionJewel }>
): number[] {
    var enabledPobNodeIds: number[] = [];

    const jSize = jewel.size;
    const jMetaOfSize = jewelMetaOfSize(jSize);

    // 算法移植自pob的BuildSubgraph()方法，不需要理解id和pobNodeIdGenerator是啥
    if (id == undefined) {
        id = 0x10000;
    }
    if (expansionJewel.size == 2) {
        id = id + (expansionJewel.index << 6);
    } else if (expansionJewel.size == 1) {
        id = id + (expansionJewel.index << 9);
    }
    var pobNodeIdGenerator = id + (jMetaOfSize.sizeIndex << 4);

    // 原始nodeId，与hashExSet是一套id体系，最后需要转换为pobNodeId（另一套体系）
    const notableIds: number[] = [];
    const socketIds: number[] = [];
    const smallIds: number[] = [];
    const keystoneIds: number[] = [];

    const group = jewel.data.subgraph.groups[`expansion_${jewel.idx}`];
    const nodeIds: number[] = group.nodes;
    const jewelNodes = jewel.data.subgraph.nodes;
    for (const i of nodeIds) {
        const jnode = jewelNodes[i];
        const nodeId = Number(i);
        if (jnode.isNotable) {
            notableIds.push(nodeId);
        } else if (jnode.isJewelSocket) {
            socketIds.push(nodeId);
            socketEJs.set(Number(jnode.skill), { id: id, ej: jnode.expansionJewel });
        } else if (jnode.isMastery) {
        } else if (jnode.isKeystone) {
            keystoneIds.push(nodeId);
        } else {
            smallIds.push(nodeId);
        }
    }

    const nodeCount = notableIds.length + socketIds.length + smallIds.length;

    // 使用0~11表示星团中node的本地位置
    const indicies = new Map<number, number>();

    if (jSize === JEWEL_SIZE_LARGE && socketIds.length === 1) {
        const nodeId = socketIds[0];
        indicies.set(6, nodeId);
    } else {
        for (let i = 0; i < socketIds.length; i++) {
            const nodeId = socketIds[i];
            const indicy = jMetaOfSize.socketIndicies[i];
            indicies.set(indicy, nodeId);
        }
    }

    const notableIndicies = [];
    for (let n of jMetaOfSize.notableIndicies) {
        if (notableIndicies.length === notableIds.length) {
            break;
        }

        if (jSize === JEWEL_SIZE_MEDIUM) {
            if (socketIds.length === 0 && notableIds.length === 2) {
                if (n === 6) {
                    n = 4;
                } else if (n === 10) {
                    n = 8;
                }
            } else if (nodeCount === 4) {
                if (n === 10) {
                    n = 9;
                } else if (n === 2) {
                    n = 3;
                }
            }
        }
        if (!indicies.has(n)) {
            notableIndicies.push(n);
        }
    }
    notableIndicies.sort((a, b) => a - b);

    for (let i = 0; i < notableIndicies.length; i++) {
        indicies.set(notableIndicies[i], notableIds[i]);
    }

    const smallIndicies = [];
    for (let n of jMetaOfSize.smallIndicies) {
        if (smallIndicies.length === smallIds.length) {
            break;
        }

        if (jSize === JEWEL_SIZE_MEDIUM) {
            if (nodeCount === 5 && n === 4) {
                n = 3;
            } else if (nodeCount == 4) {
                if (n === 8) {
                    n = 9;
                } else if (n === 4) {
                    n = 3;
                }
            }
        }
        if (!indicies.has(n)) {
            smallIndicies.push(n);
        }
    }
    smallIndicies.sort((a, b) => a - b);

    for (let i = 0; i < smallIndicies.length; i++) {
        indicies.set(smallIndicies[i], smallIds[i]);
    }

    for (const [indicy, nodeId] of indicies.entries()) {
        if (hashExSet.has(nodeId)) {
            const node = jewelNodes[nodeId];
            if (node.isJewelSocket) {
                enabledPobNodeIds.push(Number(node.skill));
            } else {
                enabledPobNodeIds.push(pobNodeIdGenerator + indicy);
            }
        }
    }

    if (keystoneIds.length > 0 && hashExSet.has(keystoneIds[0])) {
        enabledPobNodeIds.push(pobNodeIdGenerator);
    }

    return enabledPobNodeIds;
}

const JEWEL_SIZE_LARGE = "LARGE";
const JEWEL_SIZE_MEDIUM = "MEDIUM";
const JEWEL_SIZE_SMALL = "SMALL";

function jewelSize(type: string): string {
    if (type === "JewelPassiveTreeExpansionLarge") {
        return JEWEL_SIZE_LARGE;
    } else if (type === "JewelPassiveTreeExpansionMedium") {
        return JEWEL_SIZE_MEDIUM;
    } else if (type === "JewelPassiveTreeExpansionSmall") {
        return JEWEL_SIZE_SMALL;
    }
    return "";
}

function jewelMetaOfSize(size: string): JewelMetaOfSize {
    if (size === JEWEL_SIZE_LARGE) {
        return jewelMetasOfSize.large;
    } else if (size === JEWEL_SIZE_MEDIUM) {
        return jewelMetasOfSize.medium;
    } else {
        return jewelMetasOfSize.small;
    }
}