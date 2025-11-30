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
        const builder = Array<string>();
        builder.push(`<Slot itemPbURL="${this.itemPbURL}"`);
        if (this.active) {
            builder.push(` active="${this.active}"`);
        }
        builder.push(` name="${this.name}"`);
        if (this.itemId !== undefined) {
            builder.push(` itemId="${this.itemId}"`);
        }
        if (this.nodeId !== undefined) {
            builder.push(` nodeId="${this.nodeId}"`);
        }
        builder.push("/>");
        return builder.join("");
    }
}

export class SocketIdURL {
    nodeId = 0;
    name = "";
    itemPbURL = "";

    public toString() {
        return `<SocketIdURL nodeId="${this.nodeId}" name="${this.name}" itemPbURL="${this.itemPbURL}"/>`;
    }
}

export class ItemSet {
    useSecondWeaponSet: boolean = false;
    id: number = 1;
    slots: (Slot | SocketIdURL)[] = [];

    public append(item: Slot | SocketIdURL) {
        this.slots.push(item);
    }

    public toString() {
        const slotsView = this.slots.map((slot) => slot.toString()).join("\n");
        return `<ItemSet useSecondWeaponSet="${this.useSecondWeaponSet}" id="${this.id}">
${slotsView}
</ItemSet>`;
    }
}
