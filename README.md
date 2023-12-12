# pob-building-creator
Create [PathOfBuilding](https://github.com/PathOfBuildingCommunity/PathOfBuilding) building from POE API.

# Usage
```
npm install pob-building-creater
```
Create building:
```ts
import {transform} from "pob-building-creater";
const items = {};// You should get items from poe api
const passiveSkills = {};// You should get passive skills from poe api
const pob = transform(items, passiveSkills);
console.log(pob);
```

# Reference Projects

- [PathOfBuilding](https://github.com/PathOfBuildingCommunity/PathOfBuilding) A great tool of POE.
- [void-battery](https://github.com/afq984/void-battery) A building exporter of TW POE. `pob-building-creater` learns a lot from it.