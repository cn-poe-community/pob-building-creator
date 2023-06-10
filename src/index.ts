import { Item } from "./xml/Item.js";
import { PathOfBuilding } from "./xml/PathOfBuilding.js";
import Mustache from "mustache";
import { Slot } from "./xml/Slot.js";
import { Skill } from "./xml/Skill.js";
import { Socket } from "./xml/Tree.js";
import { Base64 } from "js-base64";

export function transform(items: any, passiveSkills: any): PathOfBuilding {
    // disable xml/html escape
    Mustache.escape = function (value) {
        return value;
    };

    const pob = new PathOfBuilding();
    // fill build
    const build = pob.build;
    const character = items.character;
    build.level = character.level;

    // parse items
    let idGenerator = 1;

    const buildingItemJsons = getBuildingItemJsons(items.items);
    for (const json of buildingItemJsons) {
        const item = new Item(idGenerator++, json);
        const itemList = pob.items.itemList;
        itemList.push(item);

        const slotSet = pob.items.itemSet;
        const slotName = getSlotName(json);
        const slot = Slot.NewEquipmentSlot(slotName, item.id);
        slotSet.append(slot);
        slot.itemId = item.id;

        if (json.socketedItems) {
            const sockets = json.sockets as any[];
            const socketedItems = json.socketedItems as any[];
            let group = [];
            let prevGroupNum = 0;
            const skills = pob.skills.skillSet.skills;
            for (let i = 0; i < socketedItems.length; i++) {
                const si = socketedItems[i];
                if (si.abyssJewel) {
                    const item = new Item(idGenerator++, si);
                    itemList.push(item);
                    const siSlotName = `slotName Abyssal Socket ${si.socket + 1}`;
                    const slot = Slot.NewEquipmentSlot(siSlotName, item.id);
                    slotSet.append(slot);
                    slot.itemId = item.id;
                } else {
                    if (i == 0) {
                        group.push(si);
                        prevGroupNum = sockets[0].group;
                    } else {
                        const groupNum = sockets[i].group;
                        if (groupNum !== prevGroupNum) {
                            skills.push(new Skill(slotName, group));
                            prevGroupNum = groupNum;
                            group = [si];
                        } else {
                            group.push(si);
                        }
                    }
                }
            }
            if (group.length > 0) {
                skills.push(new Skill(slotName, group));
            }
        }
    }

    //parse tree
    const spec = pob.tree.spec;
    for (const json of passiveSkills.items) {
        const item = new Item(idGenerator++, json);
        const itemList = pob.items.itemList;
        itemList.push(item);

        const socket = new Socket(getNodeId(json.x), item.id);
        spec.sockets.append(socket);
    }

    spec.url.url = `https://www.pathofexile.com/passive-skill-tree/${getEncodedTree(
        character,
        passiveSkills
    )}`;

    return pob;
}

// Return all building item jsons in items json
function getBuildingItemJsons(itemsJson: any[]): any[] {
    const list: any[] = [];
    list.push(
        ...(itemsJson as any[]).filter((item) => {
            //skip items in package, or thiefs trinket
            return item.inventoryId !== "MainInventory" && item.baseType !== "THIEFS_TRINKET";
        })
    );
    return list;
}

const SLOT_MAP: { [key: string]: string } = {
    Amulet: "Amulet",
    Belt: "Belt",
    BodyArmour: "Body Armour",
    Boots: "Boots",
    Gloves: "Gloves",
    Helm: "Helmet",
    Offhand: "Weapon 2",
    Offhand2: "Weapon 2 Swap",
    Ring: "Ring 1",
    Ring2: "Ring 2",
    Weapon: "Weapon 1",
    Weapon2: "Weapon 1 Swap",
};

function getSlotName(itemJson: any) {
    const inventoryId = itemJson.inventoryId;
    if (inventoryId === "Flask") {
        return `Flask ${itemJson.x + 1}`;
    }
    const mapping = SLOT_MAP[inventoryId];
    if (mapping) {
        return mapping;
    }
    return inventoryId;
}

const JEWEL_SLOTS = [
    26725, 36634, 33989, 41263, 60735, 61834, 31683, 28475, 6230, 48768, 34483, 7960, 46882, 55190,
    61419, 2491, 54127, 32763, 26196, 33631, 21984, 29712, 48679, 9408, 12613, 16218, 2311, 22994,
    40400, 46393, 61305, 12161, 3109, 49080, 17219, 44169, 24970, 36931, 14993, 10532, 23756, 46519,
    23984, 51198, 61666, 6910, 49684, 33753, 18436, 11150, 22748, 64583, 61288, 13170, 9797, 41876,
    59585,
];
function getNodeId(jewelSlotIndex: number): number {
    return JEWEL_SLOTS[jewelSlotIndex];
}

// copy from https://github.com/afq984/void-battery/blob/main/web/pobgen.py
function getEncodedTree(char: any, tree: any) {
    const hashes: number[] = tree.hashes;
    const head: number[] = [0, 0, 0, 6, char.classId, char.ascendancyClass, hashes.length];
    const masteryEffects: number[] = [];
    for (const child of tree.mastery_effects) {
        const effect = BigInt(child) >> BigInt(16);
        const node = BigInt(child) & BigInt(65535);
        masteryEffects.push(Number(effect));
        masteryEffects.push(Number(node));
    }

    const buffer = new ArrayBuffer(head.length + hashes.length * 2 + 2 + masteryEffects.length * 2);
    const view = new DataView(buffer);
    var offset = 0;
    for (const n of head) {
        view.setUint8(offset, n);
        offset += 1;
    }
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
