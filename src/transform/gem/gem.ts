import { transfiguredGems } from "./data.js";

const transfiguredGemSet = new Set(transfiguredGems);

export function isTransfiguredGem(name: string): boolean {
    return transfiguredGemSet.has(name);
}
