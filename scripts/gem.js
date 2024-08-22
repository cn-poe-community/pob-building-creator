import gems from "./gems.json" assert  { type: "json" };

// 生成src/transform/gem.ts里面的部分数据，需要gems.json文件（见db项目）
// 使用方式：
// node gem.js > ./gem.ts
// 将生成的内容手动复制到代码中
// 注意，powershell下生成文件的编码是UTF-16

function printTransfiguredGems(gems) {
    const first = "Ice Nova of Frostbolts";
    let onTransfiguredGems = false;
    const transfiguredGems = [];
    for (let gem of gems) {
        if (!onTransfiguredGems && gem.en == first) {
            onTransfiguredGems = true;
        }
        if (onTransfiguredGems) {
            transfiguredGems.push(gem.en);
        }
    }
    console.log(`export const transfiguredGems: string[] = [
    ${transfiguredGems.map((v) => `"${v}"`).join(", ")}
];`);
}

function main() {
    printTransfiguredGems(gems);
}

main()