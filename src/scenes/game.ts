import { gameConstants } from "../constants";
import { makeEnemy, type Enemy } from "../entities/enemy";
import { makePlayer } from "../entities/player";
import k from "../kaplayCtx";
import { addTextShadow, updateScore } from "../utils";
import { wordBank } from "../word-bank";
import type { GameObj, TextComp } from "kaplay";

export function loadGame() {
	k.setLayers(["bg", "obj", "ui"], "obj");
	k.add([k.sprite("background"), k.pos(0)]);

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
		k.anchor("center"),
		k.pos(175, 50),
		k.z(gameConstants.TEXT_Z),
	]);
	const scoreboardShadow = addTextShadow(scoreboard);

	// Game Logic
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

	k.onKeyPress((key) => {
		const wordObjs = k.get("challengeWord", { recursive: true });
		for (const wordObj of wordObjs) {
			if (wordObj.text[wordObj.currentIndex] == key) {
				wordObj.currentIndex++;
				if (wordObj.currentIndex == wordObj.text.length) {
					score++;
					const newScore = updateScore(score);
					scoreboard.text = newScore;
					scoreboardShadow.text = newScore;
					wordObj.parent?.destroy();
				}
			} else {
				wordObj.currentIndex = 0;
			}
		}
	});

	// Enemies spawn at increasing rate
	let spawnSpeed = gameConstants.SPAWN_INITIAL_RATE;
	const spawnEnemy = () => {
		const enemyList: string[] = ["axlerex", "foohrok"];

		const randEnemy = enemyList[k.randi(enemyList.length)];
		const randWord = wordBank[k.randi(wordBank.length)];

		const enemy = makeEnemy(
			k.vec2(k.width() + 50, k.randi(600, k.height())),
			randEnemy
		);
		addWordShadow(enemy, randWord);
		addWord(enemy, randWord);
		enemy.onUpdate(() => {
			enemy.move(-50, 0);
		});

		if (spawnSpeed > gameConstants.SPAWN_MIN_THRESHOLD) {
			spawnSpeed -= gameConstants.SPAWN_REDUCE_RATE;
			k.debug.log(spawnSpeed);
		}
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
	// End "cutscene"

	k.onUpdate(() => {
		// player.move(100,0);
	});
}
