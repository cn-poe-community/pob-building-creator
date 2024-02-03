import { Build } from "./Build.js";
import { Config } from "./Config.js";
import { Items } from "./Item.js";
import { Skills } from "./Skill.js";
import { Tree } from "./Tree.js";

export class PathOfBuilding {
    build = new Build();
    skills = new Skills();
    tree = new Tree();
    items = new Items();
    config = new Config();

    public toString(): string {
        return `<?xml version="1.0" encoding="UTF-8"?>
<PathOfBuilding>
${this.build}
${this.skills}
${this.tree}
${this.items}
${this.config}
</PathOfBuilding>`;
    }
}
