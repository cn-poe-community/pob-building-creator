import { TransformOptions, Transformer } from "./transform/transform.js";
import { PathOfBuilding } from "./xml/PathOfBuilding.js";
import Mustache from "mustache";
import { ItemTypes, PassiveSkillTypes } from "pathofexile-api-types";

export function transform(
    items: ItemTypes.GetItemsResult,
    passiveSkills: PassiveSkillTypes.GetPassiveSkillsResult,
    options?: TransformOptions
): PathOfBuilding {
    // disable xml/html escape
    Mustache.escape = (v) => v;
    const t = new Transformer(items, passiveSkills, options);
    t.transform();
    return t.getBuilding();
}
