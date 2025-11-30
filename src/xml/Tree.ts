import { PassiveSkillTypes } from "pathofexile-api-types";

export class Tree {
    spec = new Spec();
    public toString(): string {
        return `<Tree activeSpec="1">
${this.spec}
</Tree>`;
    }
}

export class Spec {
    treeVersion = "";
    ascendClassId = 0;
    secondaryAscendClassId = 0;
    classId = 0;
    masteryEffects: MasteryEffect[] = [];
    nodes: number[] = [];

    sockets = new Sockets();
    overrides = new Overrides();

    public toString(): string {
        const masteryEffectsView = this.masteryEffects.map((me) => me.toString()).join(",");
        const nodesView = this.nodes.join(",");

        
return `<Spec treeVersion="${this.treeVersion}" ascendClassId="${this.ascendClassId}" secondaryAscendClassId="${this.secondaryAscendClassId}" classId="${this.classId}" masteryEffects="${masteryEffectsView}" nodes="${nodesView}">
${this.sockets}
${this.overrides}
</Spec>`;
    }
}

export class MasteryEffect {
    nodeId: number;
    effectId: number;

    public constructor(nodeId: number, effectId: number) {
        this.nodeId = nodeId;
        this.effectId = effectId;
    }

    public toString(): string {
        return `{${this.nodeId},${this.effectId}}`;
    }
}

export class Sockets {
    sockets: Socket[] = [];

    public append(socket: Socket) {
        this.sockets.push(socket);
    }

    public toString(): string {
        const socketsView = this.sockets.map((socket) => socket.toString()).join("\n");
        return `<Sockets>
${socketsView}
</Sockets>`;
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

export class Overrides {
    members: Override[] = [];

    public parse(skillOverrides: PassiveSkillTypes.SkillOverrides) {
        this.members = [];
        for (const [key, value] of Object.entries(skillOverrides)) {
            this.members.push(new Override(key, value));
        }
    }

    public toString(): string {
        const membersView = this.members.map((member) => member.toString()).join("\n");
        return `<Overrides>
${membersView}
</Overrides>`;
    }
}

export class Override {
    dn: string;
    nodeId: string;

    constructor(nodeId: string, json: PassiveSkillTypes.SkillOverride) {
        this.dn = json.name;
        this.nodeId = nodeId;
    }

    public toString(): string {
        return `<Override dn="${this.dn}" nodeId="${this.nodeId}">
</Override>`;
    }
}
