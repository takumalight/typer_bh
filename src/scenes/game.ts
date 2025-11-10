import { gameConstants } from "../constants";
import { makeEnemy, type Enemy } from "../entities/enemy";
import { makePlayer } from "../entities/player";
import { makePlayerProjectile } from "../entities/projectile";
import k from "../kaplayCtx";
import { addTextShadow, displayCoordinateGrid, updateScore } from "../utils";
import { wordBank } from "../word-bank";
import type { GameObj, TextComp } from "kaplay";

export function loadGame() {
	k.add([k.sprite("background"), k.pos(0)]);

	// For placing objects
	displayCoordinateGrid(false);

	// Scoreboard
	let score = 0;
	const scoreboard = k.add([
		"scoreboard",
		k.layer("ui"),
		k.text("Score: 0", {
			font: "voya-nui",
			size: gameConstants.SCOREBOARD_TEXT_SIZE,
			align: "left",
		}),
		k.anchor("topleft"),
		k.pos(35, 25),
		k.z(gameConstants.TEXT_Z),
	]);
	const scoreboardShadow = addTextShadow(scoreboard);

	// Fail zone
	const failZone = k.add([
		"failZone",
		k.area(),
		k.pos(-175, 0),
		k.rect(10, k.height()),
	]);
	failZone.onCollide("enemy", () => {
		k.setData("final-score", score);
		k.go("game-over");
	});

	// Randomized challenge words
	const addWord = (hostEnemy: Enemy, challengeWord: string) => {
		return hostEnemy.add([
			"challengeWord",
			k.text(challengeWord, {
				align: "center",
				font: "voya-nui",
				size: gameConstants.CHALLENGE_WORD_SIZE,
			}),
			k.anchor("bot"),
			k.pos(0, -hostEnemy.height + 10),
			{
				currentIndex: 0,
				add(this: GameObj<TextComp | { currentIndex: number }>) {
					this.textTransform = (idx) => ({
						color: k.rgb(
							255,
							idx >= this.currentIndex ? 255 : 0,
							idx >= this.currentIndex ? 255 : 0
						),
					});
				},
			},
		]);
	};
	const addWordShadow = (hostEnemy: Enemy, challengeWord: string) => {
		return hostEnemy.add([
			"challengeWordShadow",
			k.text(challengeWord, {
				align: "center",
				font: "voya-nui",
				size: gameConstants.CHALLENGE_WORD_SIZE,
			}),
			k.anchor("bot"),
			k.color("#000000"),
			k.pos(1, -hostEnemy.height + 11),
		]);
	};

	// The actual typing part of the game
	k.onKeyPress((key) => {
		const wordObjs = k.get("challengeWord", { recursive: true });
		let completedWord = false;
		for (const wordObj of wordObjs) {
			if (wordObj.text[wordObj.currentIndex] == key) {
				wordObj.currentIndex++;
				// Don't require spaces to be typed
				if (wordObj.text[wordObj.currentIndex] === " ")
					wordObj.currentIndex++;
				// Run completed word logic
				if (wordObj.currentIndex == wordObj.text.length) {
					completedWord = true;
					player.play("attack", {
						onEnd() {
							player.play("idle");
						},
					});
					// Create projectile
					const projectile = makePlayerProjectile(player.pos);
					// Setup listener
					const couplingTag = String(k.time());
					const targetTag = couplingTag + "target";
					wordObj.parent?.tag(targetTag);
					/* const coupledCollisionListener = */ projectile.onCollide(
						targetTag,
						(target) => {
							// TODO: DESTROY WORD OBJS
							k.destroy(projectile);
							k.play("hit");
							target.speed = 0;
							target.play("die", {
								onEnd: () => {
									// k.tween(100, 0, 3, (o) => {
									// 	target.opacity = o;
									// });
									// k.wait(3, () => target.destroy());
									target.destroy();
								},
							});
						}
					);
					// TODO: REMOVE EVENT HANDLERS WHEN NOT NEEDED
					k.tween(
						projectile.speed,
						projectile.targetSpeed,
						0.1,
						(s) => (projectile.speed = s),
						k.easings.easeInCubic
					);
					projectile.onUpdate(() => {
						projectile.moveTo(
							wordObj.parent?.pos.add(
								0,
								-wordObj.parent.height / 2
							),
							projectile.speed
						);
					});

					score += wordObj.text.length * (wordObj.parent?.speed / 25);
					const newScore = updateScore(score);
					scoreboard.text = newScore;
					scoreboardShadow.text = newScore;
					break;
				}
			} else {
				wordObj.currentIndex = 0;
			}
		}
		if (completedWord) {
			for (const wordObj of wordObjs) {
				wordObj.currentIndex = 0;
			}
		}
	});

	// Spawning enemies
	let spawnSpeed = gameConstants.SPAWN_INITIAL_RATE;
	const spawnEnemy = () => {
		const randWord = wordBank[k.randi(wordBank.length)];

		const enemy = makeEnemy();
		addWordShadow(enemy, randWord);
		addWord(enemy, randWord);
		enemy.onUpdate(() => {
			enemy.move(-enemy.speed, 0);
		});

		k.wait(spawnSpeed / gameConstants.SPAWN_DIVISOR, spawnEnemy);
	};

	// Level start "cutscene"
	const player = makePlayer(k.vec2(-50, 625), "avokahtamer");
	player.animate("pos", [player.pos, k.vec2(100, player.pos.y)], {
		duration: 3,
		loops: 1,
	});
	player.onAnimateFinished(() => {
		player.play("idle");
		spawnEnemy();
	});
	k.loop(10, () => {
		if (spawnSpeed > gameConstants.SPAWN_MIN_THRESHOLD) {
			spawnSpeed -= gameConstants.SPAWN_REDUCE_RATE;
		}
	});
}
