import { Transformer } from "./transform/transform.js";
import { PathOfBuilding } from "./xml/PathOfBuilding.js";
import Mustache from "mustache";

export function transform(items: any, passiveSkills: any): PathOfBuilding {
    // disable xml/html escape
    Mustache.escape = v => v;
    const t = new Transformer(items, passiveSkills);
    t.transform();
    return t.getBuilding();
}
