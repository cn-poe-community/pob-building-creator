import Mustache from "mustache";
import { ItemSet } from "./Slot.js";
import { getFirstNum } from "../util/strings.js";

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
    "Mjölner": "Mjolner",
};

const BASE_TYPE_MAP: { [key: string]: string } = {
    "Maelström Staff": "Maelstrom Staff",
    "Energy Blade": "Energy Blade One Handed",
};

export class Item {
    id: number;
    readonly json: any;

    constructor(id: number, json: any) {
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
        if (json.name) {
            if (ITEM_NAME_MAP[json.name]) {
                model.name = ITEM_NAME_MAP[json.name];
            }
            if (BASE_TYPE_MAP[json.baseType]) {
                model.baseType = BASE_TYPE_MAP[json.baseType];
            }
        } else {
            const typeLine: string = json.typeLine;
            for (let baseType in BASE_TYPE_MAP) {
                if (typeLine.includes(baseType)) {
                    model.typeLine = typeLine.replace(baseType, BASE_TYPE_MAP[baseType]);
                    break;
                }
            }
        }

        const propMap = new Map<string, any>();
        if (json.properties) {
            (json.properties as any[]).forEach((prop) => propMap.set(prop.name, prop));
        }
        const qualityText = propMap.get("Quality")?.values[0][0];
        model.quality = getFirstNum(qualityText);
        model.evasionRating = propMap.get("Evasion Rating")?.values[0][0];
        model.energyShield = propMap.get("Energy Shield")?.values[0][0];
        model.armour = propMap.get("Armour")?.values[0][0];
        model.ward = propMap.get("Ward")?.values[0][0];
        model.radius = propMap.get("Radius")?.values[0][0];
        model.limitedTo = propMap.get("Limited to")?.values[0][0];

        const requireMap = new Map<string, any>();
        if (json.requirements) {
            (json.requirements as any[]).forEach((requirement) =>
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

        if (json.sockets) {
            const arr = json.sockets as any[];
            const buf = [arr[0].sColour];
            for (let i = 1; i < arr.length; i++) {
                buf.push(arr[i].group === arr[i - 1].group ? "-" : " ");
                buf.push(arr[i].sColour);
            }

            model.sockets = buf.join("");
        }

        let implicitCount = 0;
        if (model.enchantMods) {
            implicitCount += (model.enchantMods as any[]).length;
        }
        if (model.implicitMods) {
            implicitCount += (model.implicitMods as any[]).length;
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
        const tmpl = `<Item id="${this.id}">
Rarity: {{rarity}}
{{#name}}
{{name}}
{{baseType}}
{{/name}}
{{^name}}
{{typeLine}}
{{/name}}
{{#evasionRating}}
Evasion: {{evasionRating}}
{{/evasionRating}}
{{#energyShield}}
Energy Shield: {{energyShield}}
{{/energyShield}}
{{#armour}}
Armour: {{armour}}
{{/armour}}
{{#ward}}
Ward: {{ward}}
{{/ward}}
Unique ID: {{id}}
{{#shaper}}
Shaper Item
{{/shaper}}
{{#elder}}
Elder Item
{{/elder}}
{{#warlord}}
Warlord Item
{{/warlord}}
{{#hunter}}
Hunter Item
{{/hunter}}
{{#crusader}}
Crusader Item
{{/crusader}}
{{#redeemer}}
Redeemer Item
{{/redeemer}}
{{#searing}}
Searing Exarch Item
{{/searing}}
{{#tangled}}
Eater of Worlds Item
{{/tangled}}
Item Level: {{ilvl}}
{{#quality}}
Quality: {{quality}}
{{/quality}}
{{#sockets}}
Sockets: {{sockets}}
{{/sockets}}
{{#radius}}
Radius: {{radius}}
{{/radius}}
{{#limitedTo}}
Limited to: {{limitedTo}}
{{/limitedTo}}
{{#requireClass}}
Requires Class {{requireClass}}
{{/requireClass}}
Implicits: {{implicitCount}}
{{#enchantMods}}
{crafted}{{.}}
{{/enchantMods}}
{{#implicitMods}}
{{.}}
{{/implicitMods}}
{{#explicitMods}}
{{.}}
{{/explicitMods}}
{{#fracturedMods}}
{fractured}{{.}}
{{/fracturedMods}}
{{#craftedMods}}
{crafted}{{.}}
{{/craftedMods}}
{{#crucibleMods}}
{crucible}{{.}}
{{/crucibleMods}}
{{#corrupted}}
Corrupted
{{/corrupted}}
</Item>`;
        return Mustache.render(tmpl, this.viewModel());
    }
}

export class Items {
    itemList: Item[] = [];
    itemSet = new ItemSet();

    public toString(): string {
        const tmpl = `<Items>
{{#itemList}}
{{.}}
{{/itemList}}
${this.itemSet}
</Items>`;
        return Mustache.render(tmpl, this);
    }
}
