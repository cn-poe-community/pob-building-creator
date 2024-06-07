import Mustache from "mustache";

const ENEMY_SHAPER = "Pinnacle";

export class Config {
    // buff
    useFrenzyCharges: boolean | undefined = undefined; // 狂怒球
    usePowerCharges: boolean | undefined = undefined; // 暴击球
    useEnduranceCharges: boolean | undefined = undefined; // 耐力球
    multiplierGaleForce: number | undefined = undefined; // 飓风之力层数
    buffOnslaught: boolean | undefined = undefined; // 猛攻
    buffArcaneSurge: boolean | undefined = undefined; // 秘术增强
    buffUnholyMight: boolean | undefined = undefined; // 不洁之力
    buffFortification: boolean | undefined = undefined; // 护体
    buffTailwind: boolean | undefined = undefined; // 提速尾流
    buffAdrenaline: boolean | undefined = undefined; // 肾上腺素
    conditionOnConsecratedGround: boolean | undefined = undefined; // 你在奉献地面上？
    // skill
    brandAttachedToEnemy: boolean | undefined = undefined; // 烙印附加在敌人身上？
    configResonanceCount: number | undefined = undefined; // 三位一体层数
    // enemy de-buff
    projectileDistance: number | undefined = undefined; // 投射物飞行距离
    conditionEnemyBlinded: boolean | undefined = undefined; // 敌人被致盲
    overrideBuffBlinded: number | undefined = undefined; // 致盲效果
    conditionEnemyBurning: boolean | undefined = undefined; // 燃烧
    conditionEnemyIgnited: boolean | undefined = undefined; // 点燃
    conditionEnemyChilled: boolean | undefined = undefined; // 敌人被冰缓
    conditionEnemyChilledEffect: number | undefined = undefined; // 冰缓效果
    conditionEnemyShocked: boolean | undefined = undefined; // 敌人被感电
    conditionShockEffect: number | undefined = undefined; // 感电效果
    conditionEnemyScorched: boolean | undefined = undefined; // 烧灼
    conditionScorchedEffect: number | undefined = undefined; // 烧灼效果
    conditionEnemyBrittle: boolean | undefined = undefined; // 易碎
    conditionBrittleEffect: number | undefined = undefined; // 易碎效果
    conditionEnemySapped: boolean | undefined = undefined; // 筋疲力尽
    conditionSapEffect: boolean | undefined = undefined; // 筋疲力尽效果
    conditionEnemyIntimidated: boolean | undefined = undefined; // 恐吓
    conditionEnemyCrushed: boolean | undefined = undefined; // 碾压
    conditionEnemyUnnerved: boolean | undefined = undefined; // 恐惧
    conditionEnemyCoveredInFrost: boolean | undefined = undefined; // 冰霜缠身
    conditionEnemyCoveredInAsh: boolean | undefined = undefined; // 灰烬缠身
    // enemy
    enemyIsBoss = ENEMY_SHAPER;

    toString(): string {
        let inputs: Input[] = [];
        for (const [prop, val] of Object.entries(this)) {
            if (val !== undefined) {
                let input = new Input(prop, typeof val as "string" | "number" | "boolean", val);
                inputs.push(input);
            }
        }

        const tmpl = `<Config>
{{#inputs}}
{{.}}
{{/inputs}}
</Config>`;

        return Mustache.render(tmpl, { inputs });
    }
}

class Input {
    name: string;
    type: "string" | "number" | "boolean";
    val: string | number | boolean;

    constructor(name: string, type: "string" | "number" | "boolean", val: string) {
        this.name = name;
        this.type = type;
        this.val = val;
    }

    toString(): string {
        return `<Input name="${this.name}" ${this.type}="${this.val}"/>`;
    }
}
