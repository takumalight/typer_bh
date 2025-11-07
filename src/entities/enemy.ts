import type {
	AnchorComp,
	AreaComp,
	GameObj,
	PosComp,
	ScaleComp,
	SpriteComp,
	Vec2,
	ZComp,
} from "kaplay";
import k from "../kaplayCtx";
import { gameConstants } from "../constants";

export type Enemy = GameObj<
	SpriteComp | PosComp | AnchorComp | AreaComp | ScaleComp | ZComp
>;

export function makeEnemy(pos: Vec2, enemySprite: string): Enemy {
	return k.add([
		k.anchor("bot"),
		k.area(),
		k.pos(pos),
		k.scale(gameConstants.SPRITE_SCALE),
		k.sprite(enemySprite, { anim: "move" }),
		k.z(gameConstants.CHAR_Z + pos.y),
	]);
}
