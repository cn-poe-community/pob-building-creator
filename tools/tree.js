import tree from "./tree.json" assert  { type: "json" };

// 生成src/transform/tree/data.ts里面的部分数据，需要tree.json文件（见db项目）
// 使用方式：
// node tree.js > ./data.ts
// 将生成的内容手动复制到代码中
// 注意，pwoershell下生成文件的编码是UTF-16

function main() {
    createNodes(tree);
}

function createNodes(tree){
    const nodes = tree["nodes"];
    var slimTree = {}
    for (const [id, node] of Object.entries(nodes)) {
        if ("expansionJewel" in node){
            slimTree[`${id}`] = {
                "expansionJewel": node["expansionJewel"]
            } 
        }
    }
    
    console.log("export const treeNodes:{[index: number]: Node;} =");
    console.log(JSON.stringify(slimTree),";");
}

main()