import type {
	AnchorComp,
	AreaComp,
	GameObj,
	OpacityComp,
	PosComp,
	ScaleComp,
	SpriteComp,
	ZComp,
} from "kaplay";
import k from "../kaplayCtx";
import { gameConstants } from "../constants";

export type Enemy = GameObj<
	| SpriteComp
	| PosComp
	| AnchorComp
	| AreaComp
	| ScaleComp
	| ZComp
	| OpacityComp
	| { speed: number; deathThroes(): void }
>;

type EnemyData = {
	speed: number;
	spawnUpperLimit: number;
	spawnLowerLimit: number;
	spriteName: string;
	deathThroes(): void;
};

function defaultDeathThroes(this: GameObj) {
	this.play("die", {
		onEnd: () => {
			k.tween(1, 0, gameConstants.ENEMY_FADE_DURATION, (o) => {
				this.opacity = o;
			});
			k.wait(gameConstants.ENEMY_FADE_DURATION, () => this.destroy());
		},
	});
}

export function makeEnemy(): Enemy {
	const enemyData: Record<string, EnemyData> = {
		axlerex: {
			speed: 100,
			spawnUpperLimit: 510,
			spawnLowerLimit: k.height() - 75,
			spriteName: "axlerex",
			deathThroes: defaultDeathThroes,
		},
		foohrok: {
			speed: 175,
			spawnUpperLimit: 510,
			spawnLowerLimit: k.height() - 75,
			spriteName: "foohrok",
			deathThroes: defaultDeathThroes,
		},
		rama: {
			speed: 300,
			spawnUpperLimit: 175,
			spawnLowerLimit: 400,
			spriteName: "rama",
			deathThroes(this: GameObj) {
				k.addKaboom(this.pos.add(0, -this.height / 2), {
					speed: 1.5,
					scale: 1,
				});
				this.destroy();
			},
		},
	};

	const keys = Object.keys(enemyData);
	const randKey = keys[k.randi(keys.length)];
	const randEnemy = enemyData[randKey];

	const randSpawnY = k.randi(
		randEnemy.spawnUpperLimit,
		randEnemy.spawnLowerLimit
	);

	return k.add([
		"enemy",
		k.anchor("center"),
		k.area({ shape: new k.Rect(k.vec2(0), 15, 15) }),
		k.offscreen({ destroy: true }),
		k.opacity(1),
		k.pos(k.width() + 50, randSpawnY),
		k.scale(gameConstants.SPRITE_SCALE),
		k.sprite(randEnemy.spriteName, { anim: "move" }),
		k.z(gameConstants.CHAR_Z + randSpawnY),
		{
			speed: randEnemy.speed,
			deathThroes: randEnemy.deathThroes,
		},
	]);
}
