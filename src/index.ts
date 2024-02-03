import { TransformOptions, Transformer } from "./transform/transform.js";
import { PathOfBuilding } from "./xml/PathOfBuilding.js";
import Mustache from "mustache";

export function transform(
    items: any,
    passiveSkills: any,
    options?: TransformOptions
): PathOfBuilding {
    // disable xml/html escape
    Mustache.escape = (v) => v;
    const t = new Transformer(items, passiveSkills, options);
    t.transform();
    return t.getBuilding();
}
