import type { GameObj } from "kaplay";
import k from "./kaplayCtx";
import { gameConstants } from "./constants";

export function addTextShadow(textObj: GameObj) {
	return k.add([
		k.text(textObj.text, {
			font: textObj.font,
			size: textObj.textSize,
			align: textObj.align,
		}),
		k.anchor(textObj.anchor),
		k.layer(textObj.layer),
		k.pos(textObj.pos.x + 5, textObj.pos.y + 5),
		k.color("#000000"),
		k.z(gameConstants.TEXT_SHADOW_Z),
	]);
}

export function updateScore(score: number): string {
	return `Score: ${score}`;
}

export function displayCoordinateGrid() {
	for (let x = 0; x < k.width(); x += 100) {
		for (let y = 0; y < k.height(); y += 100) {
			k.add([
				k.text(`(x:${x},y:${y})`, {
					align: "center",
					size: 12,
				}),
				k.pos(x, y),
				k.anchor("center"),
			]);
		}
	}
}
