import { gameConstants } from "../constants";
import { makeEnemy, type Enemy } from "../entities/enemy";
import { makePlayer } from "../entities/player";
import {
	addWord,
	addWordShadow,
	type WordObj,
	type WordShadowObj,
} from "../entities/wordObjs";
import k from "../kaplayCtx";
import { gameStateManager } from "../main";
import {
	addTextShadow,
	attackTarget,
	displayCoordinateGrid,
	updateScore,
} from "../utils";
import { wordBank } from "../word-bank";

export function loadGame() {
	// Load background image
	k.add([k.sprite("background"), k.pos(0)]);

	// For placing objects
	displayCoordinateGrid(false);

	// Scoreboard
	let score = 0;
	const scoreboard = k.add([
		"scoreboard",
		k.layer("ui"),
		k.text("Score: 0", {
			font: gameStateManager.font,
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

	// The actual typing part of the game
	k.onKeyPress((key) => {
		let completedWord = false;

		const enemies: Enemy[] = k.get("enemy", { recursive: true }) as Enemy[];
		for (const enemy of enemies) {
			const enemyChildren = enemy.children;
			const wordObj: WordObj = enemyChildren[1] as WordObj;
			const shadowObj: WordShadowObj = enemyChildren[0] as WordShadowObj;

			// Check for correct letter typed
			if (wordObj.text[wordObj.currentIndex] == key) {
				wordObj.currentIndex++;
				// Don't require spaces to be typed
				if (wordObj.text[wordObj.currentIndex] === " ")
					wordObj.currentIndex++;

				// Run completed word logic
				if (wordObj.currentIndex == wordObj.text.length) {
					completedWord = true;

					// Disable collision with fail zone
					enemy.untag("enemy");

					// Update scoreboard
					score += wordObj.text.length * (wordObj.parent?.speed / 25);
					const newScore = updateScore(score);
					scoreboard.text = newScore;
					scoreboardShadow.text = newScore;

					// After calculating score, remove text from word objects to avoid typing conflicts
					wordObj.text = "";
					shadowObj.text = "";

					// Attack the enemy
					player.play("attack", {
						onEnd() {
							attackTarget(player, enemy);
						},
					});
					break;
				}
			} else {
				// Reset coloring
				wordObj.currentIndex = 0;
			}
		}

		// Reset other words after a successfully typed challenge word
		if (completedWord) {
			for (const enemy of enemies) {
				enemy.children[1].currentIndex = 0;
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
	const player = makePlayer(k.vec2(-50, 585), "avohkahtamer");
	player.animate("pos", [player.pos, k.vec2(100, player.pos.y)], {
		duration: 3,
		loops: 1,
	});
	player.onAnimateFinished(() => {
		player.play("idle");
		spawnEnemy();
	});
	player.onAnimEnd((anim) => {
		switch (anim) {
			case "attack":
				player.play("backswing");
				break;

			case "backswing":
				player.play("idle");
				break;

			default:
				break;
		}
	});
	k.loop(10, () => {
		if (spawnSpeed > gameConstants.SPAWN_MIN_THRESHOLD) {
			spawnSpeed -= gameConstants.SPAWN_REDUCE_RATE;
		}
	});
}
