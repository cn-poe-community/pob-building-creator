const CLASSES = [
    { name: "Scion", ascendancies: ["None", "Ascendant"] },
    { name: "Marauder", ascendancies: ["None", "Juggernaut", "Berserker", "Chieftain"] },
    { name: "Ranger", ascendancies: ["None", "Raider", "Deadeye", "Pathfinder"] },
    { name: "Witch", ascendancies: ["None", "Occultist", "Elementalist", "Necromancer"] },
    { name: "Duelist", ascendancies: ["None", "Slayer", "Gladiator", "Champion"] },
    { name: "Templar", ascendancies: ["None", "Inquisitor", "Hierophant", "Guardian"] },
    { name: "Shadow", ascendancies: ["None", "Assassin", "Trickster", "Saboteur"] },
];

export function getAscendancy(classId: number, ascendancyId: number) {
    return CLASSES[classId].ascendancies[ascendancyId];
}

export function getClassId(
    className: string
): { classId: number; ascendancyId: number } | undefined {
    for (let i = 0; i < CLASSES.length; i++) {
        if (CLASSES[i].name === className) {
            return { classId: i, ascendancyId: 0 };
        }

        const ascendancies = CLASSES[i].ascendancies;
        for (let j = 1; j < ascendancies.length; j++) {
            if (ascendancies[j] === className) {
                return { classId: i, ascendancyId: j };
            }
        }
    }
    return undefined;
}

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
