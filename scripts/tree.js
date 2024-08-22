import tree from "./tree.json" assert  { type: "json" };

// 生成src/transform/tree/data.ts里面的部分数据，需要tree.json文件（见db项目）
// 使用方式：
// node tree.js > ./tree.ts
// 将生成的内容手动复制到代码中
// 注意，powershell下生成文件的编码是UTF-16

function main() {
    createTree(tree);
}

function createTree(tree) {
    const nodes = tree["nodes"];
    let slimTree = { "nodes": {},"constants": {}};
    const proxyNodeIdSet = new Set();
    for (const [id, node] of Object.entries(nodes)) {
        if ("expansionJewel" in node) {
            const expansionJewel = node["expansionJewel"];
            if (expansionJewel === undefined) {
                print(id);
                continue;
            }
            slimTree.nodes[`${id}`] = {
                "expansionJewel": expansionJewel,
                "orbit": node["orbit"],
                "orbitIndex": node["orbitIndex"]
            }
            proxyNodeIdSet.add(expansionJewel["proxy"]);
        }
    }

    for (const [id, node] of Object.entries(nodes)) {
        if (proxyNodeIdSet.has(id)) {
            slimTree.nodes[`${id}`] = {
                "orbit": node["orbit"],
                "orbitIndex": node["orbitIndex"]
            }
        }
    }

    slimTree.constants = tree.constants;

    console.log("export const TREE: Tree = ");
    console.log(JSON.stringify(slimTree), ";");
}

main()