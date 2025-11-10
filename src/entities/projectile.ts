import type { Vec2 } from "kaplay";
import k from "../kaplayCtx";

export function makePlayerProjectile(initialPos: Vec2) {
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
