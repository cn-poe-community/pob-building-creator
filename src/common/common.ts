export function getFirstNum(text: string): number | undefined {
    //text likes + 20%, return 20
    if (text) {
        const matched = text.match(/\d+/g);
        if (matched) {
            return Number(matched[0]);
        }
    }
    return undefined;
}

export function getFirstNumOrDefault(text: string, def: number): number {
    let result = getFirstNum(text);
    if (!result) {
        result = def;
    }
    return result;
}
