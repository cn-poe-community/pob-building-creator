import { test } from "vitest";

import { transform } from "../index";
import items from "./testcase/items.json";
import passiveSkills from "./testcase/passive_skills.json";

import { writeFileSync } from "node:fs";

import { ItemTypes, PassiveSkillTypes } from "pathofexile-api-types";

test("transform", () => {
    // ignore errors
    const pob = transform(items, passiveSkills);
    writeFileSync("building.xml", pob.toString());
});
