import { TransformOptions, Transformer } from "./transform/transform.js";
import { PathOfBuilding } from "./xml/PathOfBuilding.js";
import { ItemTypes, PassiveSkillTypes } from "pathofexile-api-types";

export function transform(
    items: ItemTypes.GetItemsResult,
    passiveSkills: PassiveSkillTypes.GetPassiveSkillsResult,
    options?: TransformOptions
): PathOfBuilding {
    const t = new Transformer(items, passiveSkills, options);
    t.transform();
    return t.getBuilding();
}
