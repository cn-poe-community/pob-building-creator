import { Base64 } from "js-base64";

const JEWEL_SLOTS = [
    26725, 36634, 33989, 41263, 60735, 61834, 31683, 28475, 6230, 48768, 34483, 7960, 46882, 55190,
    61419, 2491, 54127, 32763, 26196, 33631, 21984, 29712, 48679, 9408, 12613, 16218, 2311, 22994,
    40400, 46393, 61305, 12161, 3109, 49080, 17219, 44169, 24970, 36931, 14993, 10532, 23756, 46519,
    23984, 51198, 61666, 6910, 49684, 33753, 18436, 11150, 22748, 64583, 61288, 13170, 9797, 41876,
    59585, 43670, 29914, 18060,
];

export function getNodeId(jewelSlotIndex: number): number {
    return JEWEL_SLOTS[jewelSlotIndex];
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
