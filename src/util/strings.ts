export function getFirstNum(text: string): number | undefined {
    //text likes + 20%, return 20
    const matched = text.match(/\d+/g);
    if (matched) {
        return Number(matched[0]);
    }
    return undefined;
}

export function getFirstNumOrDefault(text: string | undefined, def: number): number {
    if (!text) {
        return def;
    }

    let result = getFirstNum(text);
    return result !== undefined ? result : def;
}
