import { Build } from "./Build";
import { Items } from "./Item";
import { Skills } from "./Skill";
import { Tree } from "./Tree";

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
