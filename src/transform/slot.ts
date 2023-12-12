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

export function getSlotName(itemData: any) {
    const inventoryId = itemData.inventoryId;
    if (inventoryId === "Flask") {
        return `Flask ${itemData.x + 1}`;
    }
    const mapping = SLOT_MAP[inventoryId];
    if (mapping) {
        return mapping;
    }
    return inventoryId;
}
