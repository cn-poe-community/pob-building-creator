export type Tree = {
    nodes: { [index: number]: Node };
    constants: Constants;
};

export type Node = {
    isProxy?: boolean;
    isJewelSocket?: boolean;
    expansionJewel?: ExpansionJewel;
    orbit: number;
    orbitIndex: number;
};

export type ExpansionJewel = {
    size: number;
    index: number;
    proxy: string;
    parent?: string;
};

export type Constants = {
    classes: { [index: string]: number };
    characterAttributes: { [index: string]: number };
    PSSCentreInnerRadius: number;
    skillsPerOrbit: number[];
    orbitRadii: number[];
};

// 使用工具导出的天赋树扩展插槽节点
export const TREE: Tree = {
    nodes: {
        "2311": {
            expansionJewel: { size: 0, index: 0, proxy: "7956", parent: "9408" },
            orbit: 2,
            orbitIndex: 1,
        },
        "2491": { expansionJewel: { size: 2, index: 3, proxy: "28650" }, orbit: 1, orbitIndex: 5 },
        "3109": {
            expansionJewel: { size: 0, index: 0, proxy: "37147", parent: "46393" },
            orbit: 2,
            orbitIndex: 9,
        },
        "3854": { orbit: 1, orbitIndex: 0 },
        "6910": {
            expansionJewel: { size: 1, index: 0, proxy: "35926", parent: "32763" },
            orbit: 3,
            orbitIndex: 1,
        },
        "7956": { orbit: 1, orbitIndex: 3 },
        "7960": { expansionJewel: { size: 2, index: 0, proxy: "43989" }, orbit: 1, orbitIndex: 1 },
        "9408": {
            expansionJewel: { size: 1, index: 2, proxy: "13201", parent: "7960" },
            orbit: 3,
            orbitIndex: 1,
        },
        "9797": {
            expansionJewel: { size: 0, index: 0, proxy: "63754", parent: "64583" },
            orbit: 2,
            orbitIndex: 15,
        },
        "10532": {
            expansionJewel: { size: 1, index: 0, proxy: "37898", parent: "2491" },
            orbit: 3,
            orbitIndex: 7,
        },
        "10643": { orbit: 1, orbitIndex: 4 },
        "11150": {
            expansionJewel: { size: 0, index: 0, proxy: "10643", parent: "49684" },
            orbit: 2,
            orbitIndex: 4,
        },
        "12161": {
            expansionJewel: { size: 0, index: 0, proxy: "44470", parent: "40400" },
            orbit: 2,
            orbitIndex: 7,
        },
        "12613": {
            expansionJewel: { size: 0, index: 0, proxy: "40114", parent: "29712" },
            orbit: 2,
            orbitIndex: 12,
        },
        "13170": {
            expansionJewel: { size: 1, index: 2, proxy: "24452", parent: "21984" },
            orbit: 3,
            orbitIndex: 4,
        },
        "13201": { orbit: 2, orbitIndex: 9 },
        "14993": {
            expansionJewel: { size: 0, index: 0, proxy: "22046", parent: "44169" },
            orbit: 2,
            orbitIndex: 15,
        },
        "16218": {
            expansionJewel: { size: 0, index: 0, proxy: "18361", parent: "48679" },
            orbit: 2,
            orbitIndex: 15,
        },
        "17219": {
            expansionJewel: { size: 1, index: 1, proxy: "28018", parent: "55190" },
            orbit: 3,
            orbitIndex: 12,
        },
        "18361": { orbit: 1, orbitIndex: 2 },
        "18436": {
            expansionJewel: { size: 0, index: 0, proxy: "36414", parent: "6910" },
            orbit: 2,
            orbitIndex: 1,
        },
        "18756": { orbit: 3, orbitIndex: 9 },
        "21984": { expansionJewel: { size: 2, index: 5, proxy: "18756" }, orbit: 1, orbitIndex: 2 },
        "22046": { orbit: 1, orbitIndex: 2 },
        "22748": {
            expansionJewel: { size: 0, index: 0, proxy: "56439", parent: "33753" },
            orbit: 2,
            orbitIndex: 7,
        },
        "22994": {
            expansionJewel: { size: 1, index: 0, proxy: "51233", parent: "46882" },
            orbit: 3,
            orbitIndex: 4,
        },
        "23756": {
            expansionJewel: { size: 1, index: 1, proxy: "64166", parent: "2491" },
            orbit: 3,
            orbitIndex: 9,
        },
        "23984": {
            expansionJewel: { size: 0, index: 0, proxy: "48128", parent: "10532" },
            orbit: 2,
            orbitIndex: 7,
        },
        "24452": { orbit: 2, orbitIndex: 12 },
        "24970": {
            expansionJewel: { size: 0, index: 0, proxy: "3854", parent: "49080" },
            orbit: 2,
            orbitIndex: 9,
        },
        "25134": { orbit: 3, orbitIndex: 15 },
        "25441": { orbit: 2, orbitIndex: 1 },
        "26661": { orbit: 2, orbitIndex: 7 },
        "27475": { orbit: 1, orbitIndex: 0 },
        "27819": { orbit: 1, orbitIndex: 4 },
        "28018": { orbit: 2, orbitIndex: 4 },
        "28650": { orbit: 3, orbitIndex: 1 },
        "29712": {
            expansionJewel: { size: 1, index: 0, proxy: "55706", parent: "7960" },
            orbit: 3,
            orbitIndex: 12,
        },
        "30275": { orbit: 3, orbitIndex: 4 },
        "32763": { expansionJewel: { size: 2, index: 4, proxy: "48132" }, orbit: 1, orbitIndex: 3 },
        "33753": {
            expansionJewel: { size: 1, index: 2, proxy: "50179", parent: "32763" },
            orbit: 3,
            orbitIndex: 7,
        },
        "33833": { orbit: 2, orbitIndex: 12 },
        "34013": { orbit: 2, orbitIndex: 9 },
        "35070": { orbit: 1, orbitIndex: 1 },
        "35313": { orbit: 1, orbitIndex: 4 },
        "35853": { orbit: 2, orbitIndex: 1 },
        "35926": { orbit: 2, orbitIndex: 9 },
        "36414": { orbit: 1, orbitIndex: 3 },
        "36931": {
            expansionJewel: { size: 0, index: 0, proxy: "49951", parent: "17219" },
            orbit: 2,
            orbitIndex: 12,
        },
        "37147": { orbit: 1, orbitIndex: 0 },
        "37898": { orbit: 2, orbitIndex: 15 },
        "40114": { orbit: 1, orbitIndex: 1 },
        "40400": {
            expansionJewel: { size: 1, index: 1, proxy: "57194", parent: "46882" },
            orbit: 3,
            orbitIndex: 7,
        },
        "41876": {
            expansionJewel: { size: 0, index: 0, proxy: "54600", parent: "61288" },
            orbit: 2,
            orbitIndex: 1,
        },
        "43989": { orbit: 3, orbitIndex: 7 },
        "44169": {
            expansionJewel: { size: 1, index: 2, proxy: "53203", parent: "55190" },
            orbit: 3,
            orbitIndex: 15,
        },
        "44470": { orbit: 1, orbitIndex: 5 },
        "46393": {
            expansionJewel: { size: 1, index: 2, proxy: "35853", parent: "46882" },
            orbit: 3,
            orbitIndex: 9,
        },
        "46519": {
            expansionJewel: { size: 1, index: 2, proxy: "58355", parent: "2491" },
            orbit: 3,
            orbitIndex: 12,
        },
        "46882": { expansionJewel: { size: 2, index: 1, proxy: "25134" }, orbit: 1, orbitIndex: 4 },
        "48128": { orbit: 1, orbitIndex: 5 },
        "48132": { orbit: 3, orbitIndex: 12 },
        "48679": {
            expansionJewel: { size: 1, index: 1, proxy: "26661", parent: "7960" },
            orbit: 3,
            orbitIndex: 15,
        },
        "49080": {
            expansionJewel: { size: 1, index: 0, proxy: "25441", parent: "55190" },
            orbit: 3,
            orbitIndex: 9,
        },
        "49684": {
            expansionJewel: { size: 1, index: 1, proxy: "33833", parent: "32763" },
            orbit: 3,
            orbitIndex: 4,
        },
        "49951": { orbit: 1, orbitIndex: 1 },
        "50179": { orbit: 2, orbitIndex: 15 },
        "51198": {
            expansionJewel: { size: 0, index: 0, proxy: "27475", parent: "23756" },
            orbit: 2,
            orbitIndex: 9,
        },
        "51233": { orbit: 2, orbitIndex: 12 },
        "53203": { orbit: 2, orbitIndex: 7 },
        "54600": { orbit: 1, orbitIndex: 3 },
        "55190": { expansionJewel: { size: 2, index: 2, proxy: "30275" }, orbit: 1, orbitIndex: 0 },
        "55706": { orbit: 2, orbitIndex: 4 },
        "56439": { orbit: 1, orbitIndex: 5 },
        "57194": { orbit: 2, orbitIndex: 15 },
        "58194": { orbit: 2, orbitIndex: 7 },
        "58355": { orbit: 2, orbitIndex: 4 },
        "59585": {
            expansionJewel: { size: 0, index: 0, proxy: "27819", parent: "13170" },
            orbit: 2,
            orbitIndex: 4,
        },
        "61288": {
            expansionJewel: { size: 1, index: 1, proxy: "34013", parent: "21984" },
            orbit: 3,
            orbitIndex: 1,
        },
        "61305": {
            expansionJewel: { size: 0, index: 0, proxy: "35313", parent: "22994" },
            orbit: 2,
            orbitIndex: 4,
        },
        "61666": {
            expansionJewel: { size: 0, index: 0, proxy: "35070", parent: "46519" },
            orbit: 2,
            orbitIndex: 12,
        },
        "63754": { orbit: 1, orbitIndex: 2 },
        "64166": { orbit: 2, orbitIndex: 1 },
        "64583": {
            expansionJewel: { size: 1, index: 0, proxy: "58194", parent: "21984" },
            orbit: 3,
            orbitIndex: 15,
        },
    },
    constants: {
        classes: {
            StrDexIntClass: 0,
            StrClass: 1,
            DexClass: 2,
            IntClass: 3,
            StrDexClass: 4,
            StrIntClass: 5,
            DexIntClass: 6,
        },
        characterAttributes: { Strength: 0, Dexterity: 1, Intelligence: 2 },
        PSSCentreInnerRadius: 130,
        skillsPerOrbit: [1, 6, 16, 16, 40, 72, 72],
        orbitRadii: [0, 82, 162, 335, 493, 662, 846],
    },
};

export const CLUSTER_JEWEL_META_MAP = {
    small: {
        sizeIndex: 0,
        notableIndicies: [4],
        socketIndicies: [4],
        smallIndicies: [0, 4, 2],
        totalIndicies: 6,
    },
    medium: {
        sizeIndex: 1,
        notableIndicies: [6, 10, 2, 0],
        socketIndicies: [6],
        smallIndicies: [0, 6, 8, 4, 10, 2],
        totalIndicies: 12,
    },
    large: {
        sizeIndex: 2,
        notableIndicies: [6, 4, 8, 10, 2],
        socketIndicies: [4, 8, 6],
        smallIndicies: [0, 4, 6, 8, 10, 2, 7, 5, 9, 3, 11, 1],
        totalIndicies: 12,
    },
};

export type ClusterJewelMeta = {
    sizeIndex: number;
    notableIndicies: number[];
    socketIndicies: number[];
    smallIndicies: number[];
    totalIndicies: number;
};
