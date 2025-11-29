import { bench } from "vitest";

import { transform } from "../index";
import items from "./testcase/items.json";
import passiveSkills from "./testcase/passive_skills.json";

bench("transform", () => {
    transform(items, passiveSkills);
});
