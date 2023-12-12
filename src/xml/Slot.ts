import Mustache from "mustache";

export class Slot {
    name: string;
    itemPbURL = "";
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
        const tmpl = `<Slot itemPbURL="${this.itemPbURL}" {{#active}}active="{{active}}"{{/active}} name="{{name}}" {{#itemId}}itemId="{{itemId}}"{{/itemId}} {{#nodeId}}nodeId="{{nodeId}}"{{/nodeId}}/>`;
        return Mustache.render(tmpl, this);
    }
}

export class SocketIdURL {
    nodeId = 0;
    name = "";
    itemPbURL = "";

    public toString(){
        return `<SocketIdURL nodeId="${this.nodeId}" name="${this.name}" itemPbURL="${this.itemPbURL}"/>`;
    }
}

export class ItemSet {
    useSecondWeaponSet: boolean = false;
    id: number = 1;
    slots: (Slot|SocketIdURL)[] = [];

    public append(item: Slot|SocketIdURL) {
        this.slots.push(item);
    }

    public toString() {
        const tmpl = `<ItemSet useSecondWeaponSet="${this.useSecondWeaponSet}" id="${this.id}">
{{#slots}}
{{.}}
{{/slots}}
</ItemSet>`;
        return Mustache.render(tmpl, this);
    }
}
