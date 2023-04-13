import Mustache from "mustache";

export class Tree {
    spec = new Spec();
    public toString(): string {
        return `<Tree activeSpec="1">
${this.spec}
</Tree>`;
    }
}

export class Spec {
    treeVersion = "3_21";
    url = new URL();
    sockets = new Sockets();

    public toString(): string {
        const tmpl = `<Spec treeVersion="{{treeVersion}}"">
${this.url}
${this.sockets}
</Spec>`;
        return Mustache.render(tmpl, this);
    }
}

export class URL {
    url: string = "";

    public toString(): string {
        return `<URL>
${this.url}
</URL>`;
    }
}

export class Sockets {
    sockets: Socket[] = [];

    public append(socket: Socket) {
        this.sockets.push(socket);
    }

    public toString(): string {
        const tmpl = `<Sockets>
{{#sockets}}
{{toString}}
{{/sockets}}
</Sockets>`;
        return Mustache.render(tmpl, this);
    }
}

export class Socket {
    nodeId = 0;
    itemId = 0;

    constructor(nodeId: number, itemId: number) {
        this.nodeId = nodeId;
        this.itemId = itemId;
    }

    public toString(): string {
        return `<Socket nodeId="${this.nodeId}" itemId="${this.itemId}"/>`;
    }
}
