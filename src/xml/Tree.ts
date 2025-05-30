import Mustache from "mustache";
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

    public viewModel(): any {
        const model: any = {};
        model.masteryEffectsView = this.masteryEffects.map((me) => me.toString()).join(",");
        model.nodesView = this.nodes.join(",");

        return Object.assign({}, this, model);
    }

    public toString(): string {
        const tmpl = `<Spec treeVersion="{{treeVersion}}" ascendClassId="{{ascendClassId}}" secondaryAscendClassId="{{secondaryAscendClassId}}" classId="{{classId}}" masteryEffects="{{masteryEffectsView}}" nodes="{{nodesView}}">
{{sockets}}
{{overrides}}
</Spec>`;
        return Mustache.render(tmpl, this.viewModel());
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

export class Overrides {
    members: Override[] = [];

    public parse(skillOverrides: PassiveSkillTypes.SkillOverrides) {
        this.members = [];
        for (const [key, value] of Object.entries(skillOverrides)) {
            this.members.push(new Override(key, value));
        }
    }

    public toString(): string {
        const tmpl = `<Overrides>
{{#members}}
{{.}}
{{/members}}
</Overrides>`;

        return Mustache.render(tmpl, this);
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
        const tmpl = `<Override dn="${this.dn}" nodeId="${this.nodeId}">
</Override>`;

        return Mustache.render(tmpl, this);
    }
}
