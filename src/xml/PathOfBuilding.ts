import { Build } from "./Build.js";
import { Items } from "./Item.js";
import { Skills } from "./Skill.js";
import { Tree } from "./Tree.js";

export class PathOfBuilding {
    build = new Build();
    skills = new Skills();
    tree = new Tree();
    items = new Items();

    public toString(): string {
        return `<?xml version="1.0" encoding="UTF-8"?>
<PathOfBuilding>
${this.build}
${this.skills}
${this.tree}
${this.items}
</PathOfBuilding>`;
    }
}
