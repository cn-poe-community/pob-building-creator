import Mustache from "mustache";
import { getFirstNumOrDefault } from "../util/strings.js";
import { isTransfiguredGem } from "../transform/gem/gem.js";

export class Skills {
    skillSet = new SkillSet();

    public toString(): string {
        return `<Skills activeSkillSet="1">
${this.skillSet}
</Skills>`;
    }
}

export class SkillSet {
    skills: Skill[] = [];
    public toString(): string {
        const tmpl = `<SkillSet id="1">
{{#skills}}
{{toString}}
{{/skills}}
</SkillSet>`;
        return Mustache.render(tmpl, this);
    }
}

// 1. skills only depend on link, two active gems can be in one skill
// 2. vaal gem is treated as one gem
// 3. computed gem(like Arcanist Brand) is treated as one gem
export class Skill {
    slot = "";
    gems: Gem[] = [];

    constructor(slotName: string, json: any[]) {
        this.slot = slotName;
        for (const gemJson of json) {
            this.gems.push(new Gem(gemJson));
        }
    }

    public toString(): string {
        const tmpl = `<Skill enabled="true" slot="{{slot}}" mainActiveSkill="nil">
{{#gems}}
{{.}}
{{/gems}}
</Skill>`;
        return Mustache.render(tmpl, this);
    }
}

export class Gem {
    level = 20;
    qualityId = "Default";
    quality = 0;
    nameSpec = "";
    enableGlobal1 = true;
    enableGlobal2 = false;

    constructor(json: any) {
        const propMap = new Map<string, any>();
        if (json.properties) {
            (json.properties as any[]).forEach((prop) => propMap.set(prop.name, prop));
        }
        this.level = getFirstNumOrDefault(propMap.get("Level")?.values[0][0], 20);
        this.quality = getFirstNumOrDefault(propMap.get("Quality")?.values[0][0], 0);

        if (json.hybrid && json.hybrid.isVaalGem) {
            let hybridBaseTypeName = json.hybrid.baseTypeName;
            if (isTransfiguredGem(hybridBaseTypeName)) {
                this.nameSpec = this.nameSpecOfVaalTransfiguredGem(hybridBaseTypeName);
            }
        } else {
            this.nameSpec = json.baseType.replace(" Support", "");
        }

        if (this.isVaalGem()) {
            this.enableGlobal1 = false;
            this.enableGlobal2 = true;
        }
    }

    nameSpecOfVaalTransfiguredGem(transfiguredGemName: string): string {
        return "Vaal " + transfiguredGemName;
    }

    isVaalGem() {
        return this.nameSpec.startsWith("Vaal ");
    }

    public toString(): string {
        const tmpl = `<Gem level="{{level}}" qualityId="{{qualityId}}" quality="{{quality}}" nameSpec="{{nameSpec}}" enabled="true" enableGlobal1="{{enableGlobal1}}" enableGlobal2="{{enableGlobal2}}"/>`;
        return Mustache.render(tmpl, this);
    }
}
