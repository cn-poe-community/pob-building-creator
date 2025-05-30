import { test } from 'vitest';

import { transform } from "../index";
import items from "./testcase/items.json";
import passiveSkills from "./testcase/passive_skills.json";

import { writeFileSync } from "node:fs";

test("transform", () => {
    const pob = transform(items, passiveSkills);
    writeFileSync("building.xml", pob.toString());
});
