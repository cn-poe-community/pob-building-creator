import Mustache from "mustache";
import { PathOfBuilding } from "../xml/PathOfBuilding.js";
import { Item } from "../xml/Item.js";
import { getSlotName } from "./slot.js";
import { Slot } from "../xml/Slot.js";
import { Skill } from "../xml/Skill.js";
import { MasteryEffect, Socket } from "../xml/Tree.js";
import {
    getEnabledNodeIdsOfJewels,
    getAscendancy,
    getClass,
    getClassId,
    getNodeIdOfExpansionSlot,
} from "./tree/tree.js";

export type TransformOptions = {
    skipWeapon2: boolean;
};

export class Transformer {
    private itemsData: any;
    private passiveSkillsData: any;
    private building?: PathOfBuilding;
    private itemIdGenerator = 1;
    private options?: TransformOptions;

    constructor(itemsData: any, passiveSkillsData: any, options?: TransformOptions) {
        this.itemsData = itemsData;
        this.passiveSkillsData = passiveSkillsData;
        this.options = options;
    }

    public transform(): void {
        const building = new PathOfBuilding();
        this.building = building;
        this.itemIdGenerator = 1;

        // fill build
        const build = building.build;
        const character = this.itemsData.character;
        build.level = character.level;

        let classIds = getClassId(character.class)!;
        build.className = getClass(classIds.classId);
        build.ascendClassName = getAscendancy(classIds.classId, classIds.ascendancyId);

        // parse json
        this.parseItems();
        this.parseTree();
    }

    private parseItems() {
        const building = this.building!;

        const itemDataArray = this.getBuildingItemDataArray();
        for (const data of itemDataArray) {
            const item = new Item(this.itemIdGenerator++, data);
            const itemList = building.items.itemList;
            itemList.push(item);

            const slotSet = building.items.itemSet;
            const slotName = getSlotName(data);
            const slot = Slot.NewEquipmentSlot(slotName, item.id);
            slotSet.append(slot);

            if (data.socketedItems && data.socketedItems.length > 0) {
                const sockets = data.sockets as any[];
                const socketedItems = data.socketedItems as any[];

                let group = [];
                let prevGroupNum = 0;
                const skills = building.skills.skillSet.skills;
                let abyssJewelCount = 0;

                for (let i = 0; i < socketedItems.length; i++) {
                    const si = socketedItems[i];
                    if (si.abyssJewel) {
                        abyssJewelCount++;
                        const item = new Item(this.itemIdGenerator++, si);
                        itemList.push(item);
                        const siSlotName = `${slotName} Abyssal Socket ${abyssJewelCount}`;
                        const slot = Slot.NewEquipmentSlot(siSlotName, item.id);
                        slotSet.append(slot);
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
    }

    // Return all building item json data
    getBuildingItemDataArray(): any[] {
        const itemsJson = this.itemsData.items;
        const list: any[] = [];
        list.push(
            ...(itemsJson as any[]).filter((item) => {
                switch (item.inventoryId) {
                    case "Weapon2":
                    case "Offhand2":
                        if (this.options?.skipWeapon2) {
                            return false;
                        }
                        break;
                    case "MainInventory": // item in package
                    case "ExpandedMainInventory": // item in expanded package
                        return false;
                }

                if (item.baseType === "THIEFS_TRINKET") {
                    return false;
                }
                return true;
            })
        );
        return list;
    }

    private parseTree() {
        const building = this.building!;
        const character = this.itemsData.character;

        const spec = building.tree.spec;
        const itemList = building.items.itemList;
        for (const itemData of this.passiveSkillsData.items) {
            const item = new Item(this.itemIdGenerator++, itemData);
            itemList.push(item);

            const socket = new Socket(getNodeIdOfExpansionSlot(itemData.x), item.id);
            spec.sockets.append(socket);
        }

        let classIds = getClassId(character.class);
        if (classIds !== undefined) {
            spec.ascendClassId = classIds.ascendancyId;
            spec.classId = classIds.classId;
        }

        spec.secondaryAscendClassId = this.passiveSkillsData.alternate_ascendancy;

        for (const [node, effect] of Object.entries<number>(
            this.passiveSkillsData.mastery_effects
        )) {
            spec.masteryEffects.push(new MasteryEffect(Number(node), effect));
        }

        spec.nodes = this.passiveSkillsData.hashes;

        spec.nodes.push(...getEnabledNodeIdsOfJewels(this.passiveSkillsData));

        spec.overrides.parse(this.passiveSkillsData.skill_overrides);
    }

    public getBuilding(): PathOfBuilding {
        return this.building!;
    }
}
