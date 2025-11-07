import type { Vec2 } from "kaplay";
import k from "../kaplayCtx";
import { gameConstants } from "../constants";

export function makePlayer(pos: Vec2, selectedCharacter: string) {
	return k.add([
		k.anchor("bot"),
		k.animate(),
		k.pos(pos),
		k.scale(gameConstants.SPRITE_SCALE),
		k.sprite(selectedCharacter, { anim: "walk" }),
		k.z(gameConstants.CHAR_Z + pos.y),
	]);
}
