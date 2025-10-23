import type { GameObj } from "kaplay";
import k from "./kaplayCtx";
import { gameConstants } from "./constants";

export function addTextShadow(textObj: GameObj) {
    return k.add([
        k.text(textObj.text, {
            font: textObj.font,
            size: textObj.textSize,
            align: textObj.align
        }),
        k.anchor("center"),
        k.pos(textObj.pos.x + 5, textObj.pos.y + 5),
        k.color("#000000"),
        k.z(gameConstants.TEXT_SHADOW_Z)
    ]);
}