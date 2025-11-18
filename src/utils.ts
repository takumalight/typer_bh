import type { GameObj } from "kaplay";
import k from "./kaplayCtx";
import { gameConstants } from "./constants";
import { makePlayerProjectile } from "./entities/projectile";
import type { Player } from "./entities/player";
import type { Enemy } from "./entities/enemy";
import { gameStateManager } from "./main";

export type TextShadow = ReturnType<typeof addTextShadow>;

export function addTextShadow(textObj: GameObj) {
	return k.add([
		k.text(textObj.text, {
			font: textObj.font,
			size: textObj.textSize,
			align: textObj.align,
			width: textObj.width != undefined ? textObj.width : undefined,
		}),
		k.anchor(textObj.anchor),
		k.color("#000000"),
		k.layer(textObj.layer),
		k.opacity(textObj.opacity != undefined ? textObj.opacity : 1),
		k.pos(textObj.pos.x + 5, textObj.pos.y + 5),
		k.z(gameConstants.TEXT_SHADOW_Z),
	]);
}

export function updateScore(score: number): string {
	return `Score: ${score}`;
}

export function displayCoordinateGrid(shouldDisplay: boolean) {
	if (!shouldDisplay) return;
	for (let x = 0; x < k.width(); x += 100) {
		for (let y = 0; y < k.height(); y += 100) {
			k.add([
				"coordinateGridMarker",
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

export function attackTarget(player: Player, enemy: Enemy) {
	// Create projectile
	const projectile = makePlayerProjectile(player.pos.add(35, 20));
	// Setup listener
	const targetTag = String(k.time()) + "target";
	enemy.tag(targetTag);
	projectile.onCollide(targetTag, (target) => {
		k.destroy(projectile);
		if (gameStateManager.shake) {
			k.shake(gameConstants.SCREEN_SHAKE_INTENSITY);
		}
		k.play("hit");
		target.speed = 0;
		target.deathThroes();
	});
	// TODO: REMOVE EVENT HANDLERS WHEN NOT NEEDED
	k.tween(
		projectile.speed,
		projectile.targetSpeed,
		0.1,
		(s) => (projectile.speed = s),
		k.easings.easeInCubic
	);
	projectile.onUpdate(() => {
		projectile.moveTo(enemy.pos, projectile.speed);
	});
}
