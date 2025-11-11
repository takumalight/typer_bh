import type {
	Vec2,
	GameObj,
	PosComp,
	ZComp,
	ColorComp,
	AreaComp,
	CircleComp,
} from "kaplay";
import k from "../kaplayCtx";

export type PlayerProjectile = GameObj<
	| PosComp
	| ZComp
	| ColorComp
	| AreaComp
	| CircleComp
	| {
			speed: number;
			targetSpeed: number;
	  }
>;

export function makePlayerProjectile(initialPos: Vec2): PlayerProjectile {
	return k.add([
		// k.animate(),
		k.area(),
		k.pos(initialPos),
		k.circle(10),
		k.color(150, 200, 255),
		k.z(200 + k.height()),
		{
			speed: 0,
			targetSpeed: 2000,
		},
	]);
}
