import type { Vec2 } from "kaplay";
import k from "../kaplayCtx";
import { gameConstants } from "../constants";

export function makePlayer(pos: Vec2, selectedCharacter: string) {
    k.add([
        k.sprite(selectedCharacter, { anim: "walk" }),
        k.pos(pos),
        k.anchor("bot"),
        k.scale(gameConstants.SPRITE_SCALE)
    ]);
}