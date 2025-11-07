import type {
	AnchorComp,
	AreaComp,
	GameObj,
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
	| { speed: number }
>;
type EnemyData = {
	speed: number;
	spawnUpperLimit: number;
	spawnLowerLimit: number;
	spriteName: string;
};

export function makeEnemy(): Enemy {
	const enemyData: Record<string, EnemyData> = {
		axlerex: {
			speed: 100,
			spawnUpperLimit: 510,
			spawnLowerLimit: k.height(),
			spriteName: "axlerex",
		},
		foohrok: {
			speed: 175,
			spawnUpperLimit: 510,
			spawnLowerLimit: k.height(),
			spriteName: "foohrok",
		},
		rama: {
			speed: 300,
			spawnUpperLimit: 175,
			spawnLowerLimit: 400,
			spriteName: "rama",
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
		k.anchor("bot"),
		k.area(),
		k.pos(k.width() + 50, randSpawnY),
		k.scale(gameConstants.SPRITE_SCALE),
		k.sprite(randEnemy.spriteName, { anim: "move" }),
		k.z(gameConstants.CHAR_Z + randSpawnY),
		{
			speed: randEnemy.speed,
		},
	]);
}
