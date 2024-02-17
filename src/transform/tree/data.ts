// 使用工具导出的不完整的天赋树结点集
export const treeNodes: { [index: number]: Node } = {
    "2311": { expansionJewel: { size: 0, index: 0, proxy: "7956", parent: "9408" } },
    "2491": { expansionJewel: { size: 2, index: 3, proxy: "28650" } },
    "3109": { expansionJewel: { size: 0, index: 0, proxy: "37147", parent: "46393" } },
    "6910": { expansionJewel: { size: 1, index: 0, proxy: "35926", parent: "32763" } },
    "7960": { expansionJewel: { size: 2, index: 0, proxy: "43989" } },
    "9408": { expansionJewel: { size: 1, index: 2, proxy: "13201", parent: "7960" } },
    "9797": { expansionJewel: { size: 0, index: 0, proxy: "63754", parent: "64583" } },
    "10532": { expansionJewel: { size: 1, index: 0, proxy: "37898", parent: "2491" } },
    "11150": { expansionJewel: { size: 0, index: 0, proxy: "10643", parent: "49684" } },
    "12161": { expansionJewel: { size: 0, index: 0, proxy: "44470", parent: "40400" } },
    "12613": { expansionJewel: { size: 0, index: 0, proxy: "40114", parent: "29712" } },
    "13170": { expansionJewel: { size: 1, index: 2, proxy: "24452", parent: "21984" } },
    "14993": { expansionJewel: { size: 0, index: 0, proxy: "22046", parent: "44169" } },
    "16218": { expansionJewel: { size: 0, index: 0, proxy: "18361", parent: "48679" } },
    "17219": { expansionJewel: { size: 1, index: 1, proxy: "28018", parent: "55190" } },
    "18436": { expansionJewel: { size: 0, index: 0, proxy: "36414", parent: "6910" } },
    "21984": { expansionJewel: { size: 2, index: 5, proxy: "18756" } },
    "22748": { expansionJewel: { size: 0, index: 0, proxy: "56439", parent: "33753" } },
    "22994": { expansionJewel: { size: 1, index: 0, proxy: "51233", parent: "46882" } },
    "23756": { expansionJewel: { size: 1, index: 1, proxy: "64166", parent: "2491" } },
    "23984": { expansionJewel: { size: 0, index: 0, proxy: "48128", parent: "10532" } },
    "24970": { expansionJewel: { size: 0, index: 0, proxy: "3854", parent: "49080" } },
    "29712": { expansionJewel: { size: 1, index: 0, proxy: "55706", parent: "7960" } },
    "32763": { expansionJewel: { size: 2, index: 4, proxy: "48132" } },
    "33753": { expansionJewel: { size: 1, index: 2, proxy: "50179", parent: "32763" } },
    "36931": { expansionJewel: { size: 0, index: 0, proxy: "49951", parent: "17219" } },
    "40400": { expansionJewel: { size: 1, index: 1, proxy: "57194", parent: "46882" } },
    "41876": { expansionJewel: { size: 0, index: 0, proxy: "54600", parent: "61288" } },
    "44169": { expansionJewel: { size: 1, index: 2, proxy: "53203", parent: "55190" } },
    "46393": { expansionJewel: { size: 1, index: 2, proxy: "35853", parent: "46882" } },
    "46519": { expansionJewel: { size: 1, index: 2, proxy: "58355", parent: "2491" } },
    "46882": { expansionJewel: { size: 2, index: 1, proxy: "25134" } },
    "48679": { expansionJewel: { size: 1, index: 1, proxy: "26661", parent: "7960" } },
    "49080": { expansionJewel: { size: 1, index: 0, proxy: "25441", parent: "55190" } },
    "49684": { expansionJewel: { size: 1, index: 1, proxy: "33833", parent: "32763" } },
    "51198": { expansionJewel: { size: 0, index: 0, proxy: "27475", parent: "23756" } },
    "55190": { expansionJewel: { size: 2, index: 2, proxy: "30275" } },
    "59585": { expansionJewel: { size: 0, index: 0, proxy: "27819", parent: "13170" } },
    "61288": { expansionJewel: { size: 1, index: 1, proxy: "34013", parent: "21984" } },
    "61305": { expansionJewel: { size: 0, index: 0, proxy: "35313", parent: "22994" } },
    "61666": { expansionJewel: { size: 0, index: 0, proxy: "35070", parent: "46519" } },
    "64583": { expansionJewel: { size: 1, index: 0, proxy: "58194", parent: "21984" } },
};

export type Node = {
    expansionJewel: ExpansionJewel;
};

export type ExpansionJewel = {
    size: number;
    index: number;
    proxy: string;
    parent?: string;
};

export const jewelMetaOfSizeMap = {
    small: {
        sizeIndex: 0,
        notableIndicies: [4],
        socketIndicies: [4],
        smallIndicies: [0, 4, 2],
    },
    medium: {
        sizeIndex: 1,
        notableIndicies: [6, 10, 2, 0],
        socketIndicies: [6],
        smallIndicies: [0, 6, 8, 4, 10, 2],
    },
    large: {
        sizeIndex: 2,
        notableIndicies: [6, 4, 8, 10, 2],
        socketIndicies: [4, 8, 6],
        smallIndicies: [0, 4, 6, 8, 10, 2, 7, 5, 9, 3, 11, 1],
    },
};

export type JewelMetaOfSize = {
    sizeIndex: number;
    notableIndicies: number[];
    socketIndicies: number[];
    smallIndicies: number[];
};
