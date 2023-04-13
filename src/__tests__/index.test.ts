import { transform } from "../index";
import items from "./testcase/items.json";
import passiveSkills from "./testcase/passiveSkills.json";

const fs = require("fs");

test("transform", () => {
    const pob = transform(items, passiveSkills);
    fs.writeFileSync("building.xml", pob.toString());
});
