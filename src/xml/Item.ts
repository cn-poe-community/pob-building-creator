import { ItemSet } from "./Slot.js";
import { getFirstNum } from "../util/strings.js";
import { ItemTypes } from "pathofexile-api-types";

const RARITY_MAP: { [key: string]: string } = {
    0: "NORMAL",
    1: "MAGIC",
    2: "RARE",
    3: "UNIQUE",
    9: "RELIC",
    10: "RELIC",
};

function toPobRarity(frameType: number) {
    return RARITY_MAP[frameType];
}

const ITEM_NAME_MAP: { [key: string]: string } = {
    "Doppelgänger Guise": "Doppelganger Guise",
    Mjölner: "Mjolner",
};

const POB_BASE_TYPE_ENERGY_BLADE = "Energy Blade One Handed";

const BASE_TYPE_MAP: { [key: string]: string } = {
    "Maelström Staff": "Maelstrom Staff",
    "Energy Blade": POB_BASE_TYPE_ENERGY_BLADE,
};

export class Item {
    id: number;
    readonly json: ItemTypes.Item;

    constructor(id: number, json: ItemTypes.Item) {
        this.id = id;
        this.json = json;
    }

    viewModel() {
        const model: any = {};
        const json = this.json;

        model.rarity = toPobRarity(this.json.frameType);

        model.name = json.name;
        model.baseType = json.baseType;
        model.typeLine = json.typeLine;

        if (ITEM_NAME_MAP[model.name]) {
            model.name = ITEM_NAME_MAP[model.name];
        }
        if (BASE_TYPE_MAP[model.baseType]) {
            model.baseType = BASE_TYPE_MAP[model.baseType];
        }

        if (model.name === "") {
            const typeLine: string = model.typeLine;
            for (let baseType in BASE_TYPE_MAP) {
                if (typeLine.includes(baseType)) {
                    model.typeLine = typeLine.replace(baseType, BASE_TYPE_MAP[baseType]);
                    break;
                }
            }
        }

        const propMap = new Map<string, ItemTypes.Property>();
        if (json.properties) {
            json.properties.forEach((prop) => propMap.set(prop.name, prop));
        }
        const qualityText = propMap.get("Quality")?.values[0][0];
        model.quality = qualityText !== undefined ? getFirstNum(qualityText) : undefined;
        model.evasionRating = propMap.get("Evasion Rating")?.values[0][0];
        model.energyShield = propMap.get("Energy Shield")?.values[0][0];
        model.armour = propMap.get("Armour")?.values[0][0];
        model.ward = propMap.get("Ward")?.values[0][0];
        model.radius = propMap.get("Radius")?.values[0][0];
        model.limitedTo = propMap.get("Limited to")?.values[0][0];

        const requireMap = new Map<string, ItemTypes.Requirement>();
        if (json.requirements) {
            json.requirements.forEach((requirement) =>
                requireMap.set(requirement.name, requirement)
            );
        }
        model.requireClass = requireMap.get("Class:")?.values[0][0];

        model.enchantMods = (json.enchantMods as string[])?.map((mod) => mod.split("\n")).flat();
        model.implicitMods = (json.implicitMods as string[])?.map((mod) => mod.split("\n")).flat();
        model.explicitMods = (json.explicitMods as string[])?.map((mod) => mod.split("\n")).flat();
        model.craftedMods = (json.craftedMods as string[])?.map((mod) => mod.split("\n")).flat();
        model.fracturedMods = (json.fracturedMods as string[])
            ?.map((mod) => mod.split("\n"))
            .flat();
        model.crucibleMods = (json.crucibleMods as string[])?.map((mod) => mod.split("\n")).flat();
        model.mutatedMods = (json.mutatedMods as string[])?.map((mod) => mod.split("\n")).flat();

        let abyssalSocketCount = 0;
        if (json.sockets) {
            const arr = json.sockets;
            const builder = [];
            for (let i = 0; i < arr.length; i++) {
                if (i > 0) {
                    builder.push(arr[i].group === arr[i - 1].group ? "-" : " ");
                }
                const color = arr[i].sColour;
                builder.push(color);
                if (color === "A") {
                    abyssalSocketCount++;
                }
            }

            model.sockets = builder.join("");
        }

        if (model.baseType === POB_BASE_TYPE_ENERGY_BLADE) {
            model.implicitMods = undefined;
            if (abyssalSocketCount > 0) {
                model.explicitMods = [`Has ${abyssalSocketCount} Abyssal Sockets`];
            }
        }

        let implicitCount = 0;
        if (model.enchantMods) {
            implicitCount += model.enchantMods.length;
        }
        if (model.implicitMods) {
            implicitCount += model.implicitMods.length;
        }
        model.implicitCount = implicitCount;

        if (json.influences) {
            Object.assign(model, json.influences); // shaper,elder,warlord,hunter,crusader,redeemer
        }

        model.id = json.id;
        model.searing = json.searing;
        model.tangled = json.tangled;
        model.ilvl = json.ilvl;
        model.corrupted = json.corrupted;

        return model;
    }

    public toString(): string {
        const builder = Array<string>();
        const model = this.viewModel();

        builder.push(`<Item id="${this.id}">`);
        builder.push(`Rarity: ${model.rarity}`);
        if (model.name) {
            builder.push(model.name);
            builder.push(model.baseType);
        } else {
            builder.push(model.typeLine);
        }
        if (model.evasionRating) {
            builder.push(`Evasion: ${model.evasionRating}`);
        }
        if (model.energyShield) {
            builder.push(`Energy Shield: ${model.energyShield}`);
        }
        if (model.armour) {
            builder.push(`Armour: ${model.armour}`);
        }
        if (model.ward) {
            builder.push(`Ward: ${model.ward}`);
        }
        builder.push(`Unique ID: ${model.id}`);
        if (model.shaper) {
            builder.push("Shaper Item");
        }
        if (model.elder) {
            builder.push("Elder Item");
        }
        if (model.warlord) {
            builder.push("Warlord Item");
        }
        if (model.hunter) {
            builder.push("Hunter Item");
        }
        if (model.crusader) {
            builder.push("Crusader Item");
        }
        if (model.redeemer) {
            builder.push("Redeemer Item");
        }
        if (model.searing) {
            builder.push("Searing Exarch Item");
        }
        if (model.tangled) {
            builder.push("Eater of Worlds Item");
        }
        builder.push(`Item Level: ${model.ilvl}`);
        if (model.quality !== undefined) {
            builder.push(`Quality: ${model.quality}`);
        }
        if (model.sockets) {
            builder.push(`Sockets: ${model.sockets}`);
        }
        if (model.radius) {
            builder.push(`Radius: ${model.radius}`);
        }
        if (model.limitedTo) {
            builder.push(`Limited to: ${model.limitedTo}`);
        }
        if (model.requireClass) {
            builder.push(`Requires Class ${model.requireClass}`);
        }
        builder.push(`Implicits: ${model.implicitCount}`);
        if (model.enchantMods) {
            for (const mod of model.enchantMods) {
                builder.push(`{crafted}${mod}`);
            }
        }
        if (model.implicitMods) {
            for (const mod of model.implicitMods) {
                builder.push(mod);
            }
        }
        if (model.explicitMods) {
            for (const mod of model.explicitMods) {
                builder.push(mod);
            }
        }
        if (model.mutatedMods) {
            for (const mod of model.mutatedMods) {
                builder.push(`{mutated}${mod}`);
            }
        }
        if (model.fracturedMods) {
            for (const mod of model.fracturedMods) {
                builder.push(`{fractured}${mod}`);
            }
        }
        if (model.craftedMods) {
            for (const mod of model.craftedMods) {
                builder.push(`{crafted}${mod}`);
            }
        }
        if (model.crucibleMods) {
            for (const mod of model.crucibleMods) {
                builder.push(`{crucible}${mod}`);
            }
        }
        if (model.corrupted) {
            builder.push("Corrupted");
        }
        builder.push(`</Item>`);

        return builder.join("\n");
    }
}

export class Items {
    itemList: Item[] = [];
    itemSet = new ItemSet();

    public toString(): string {
        const itemsView = this.itemList.map((item) => item.toString()).join("\n");
        return `<Items>
${itemsView}
${this.itemSet}
</Items>`;
    }
}
