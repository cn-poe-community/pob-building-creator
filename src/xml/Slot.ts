import Mustache from "mustache";

export class Slot {
    name: string;
    itemId?: number;
    nodeId?: number;
    active: boolean;

    private constructor(name: string, itemId?: number, nodeId?: number) {
        this.name = name;
        this.itemId = itemId;
        this.nodeId = nodeId;
        this.active = false;
    }

    public static NewEquipmentSlot(name: string, itemId: number): Slot {
        const slot = new Slot(name, itemId, undefined);
        if (slot.name.startsWith("Flask ")) {
            slot.active = true;
        }

        return slot;
    }

    public static NewJewelSlot(name: string, nodeId: number) {
        return new Slot(name, undefined, nodeId);
    }

    public toString(): string {
        const tmpl = `<Slot {{#active}}active="{{active}}"{{/active}} name="{{name}}" {{#itemId}}itemId="{{itemId}}"{{/itemId}} {{#nodeId}}nodeId="{{nodeId}}"{{/nodeId}}/>`;
        return Mustache.render(tmpl, this);
    }
}

export class ItemSet {
    slots: Slot[] = [];

    public append(slot: Slot) {
        this.slots.push(slot);
    }

    public toString() {
        const tmpl = `<ItemSet useSecondWeaponSet="false" id="1">
{{#slots}}
{{.}}
{{/slots}}
</ItemSet>`;
        return Mustache.render(tmpl, this);
    }
}
