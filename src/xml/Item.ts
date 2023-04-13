import Mustache from "mustache";
import { ItemSet } from "./Slot";
import { getFirstNum } from "../common/common";

const RARITY_MAP: { [key: string]: string } = {
    0: "NORMAL",
    1: "MAGIC",
    2: "RARE",
    3: "UNIQUE",
    9: "RELIC",
};

function toPobRariy(frameType: number) {
    return RARITY_MAP[frameType];
}

export class Item {
    id: number;
    json: any;

    constructor(id: number, json: any) {
        this.id = id;
        this.json = json;
    }

    viewModel() {
        const model: any = {};
        const json = this.json;

        model.rarity = toPobRariy(this.json.frameType);
        const propMap = new Map<string, any>();
        if (json.properties) {
            (json.properties as any[]).forEach((prop) => propMap.set(prop.name, prop));
        }
        const qualityText = propMap.get("Quality")?.values[0][0];
        model.quality = getFirstNum(qualityText);
        model.evasionRating = propMap.get("Evasion Rating")?.values[0][0];
        model.energyShield = propMap.get("Energy Shield")?.values[0][0];
        model.armout = propMap.get("Armour")?.values[0][0];
        model.ward = propMap.get("Ward")?.values[0][0];
        model.radius = propMap.get("Radius")?.values[0][0];

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

            // because json contains sockets
            // use Sockets
            model.Sockets = buf.join("");
        }

        let implicitCount = 0;
        if (model.enchantMods) {
            implicitCount += (model.enchantMods as any[]).length;
        }
        if (model.implicitMods) {
            implicitCount += (model.implicitMods as any[]).length;
        }
        model.implicitCount = implicitCount;

        return Object.assign({}, json, model);
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
{{#armout}}
Armour: {{armout}}
{{/armout}}
{{#ward}}
Ward: {{ward}}
{{/ward}}
Unique ID: {{id}}
Item Level: {{ilvl}}
{{#quality}}
Quality: {{quality}}
{{/quality}}
{{#Sockets}}
Sockets: {{Sockets}}
{{/Sockets}}
{{#radius}}
Radius: {{radius}}
{{/radius}}
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
{{#craftedMods}}
{crafted}{{.}}
{{/craftedMods}}
{{#fracturedMods}}
{fractured}{{.}}
{{/fracturedMods}}
{{#crucibleMods}}
{crucible}{{.}}
{{/crucibleMods}}
{{#shaper}}
Shaper Item
{{/shaper}}
{{#elder}}
Elder Item
{{/elder}}
{{#fractured}}
Fractured Item
{{/fractured}}
{{#synthesised}}
Fractured Item
{{/synthesised}}
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
