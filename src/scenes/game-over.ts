import k from "../kaplayCtx";
import { gameStateManager } from "../main";

export function loadGameOver() {
	let highScore = k.getData("high-score") ?? 0;
	const finalScore = k.getData("final-score");
	if (finalScore && finalScore > highScore) {
		k.setData("high-score", finalScore);
		highScore = finalScore;
	}
	k.add([k.sprite("background"), k.pos(0), k.opacity(0.5)]);
	k.add([
		k.text("Game Over", {
			size: 75,
			align: "center",
			font: gameStateManager.font,
		}),
		k.anchor("center"),
		k.color("#ffffff"),
		k.pos(k.center().x, (k.height() * 1) / 5),
	]);
	const finalScoreObj = k.add([
		k.text(`Final Score: ${finalScore}`, {
			size: 75,
			align: "center",
			font: gameStateManager.font,
		}),
		k.anchor("center"),
		k.color("#ffffff"),
		k.opacity(0),
		k.pos(k.center().x, (k.height() * 2) / 5),
	]);
	const highScoreObj = k.add([
		k.text(`High Score: ${highScore}`, {
			size: 75,
			align: "center",
			font: gameStateManager.font,
		}),
		k.anchor("center"),
		k.color("#ffffff"),
		k.opacity(0),
		k.pos(k.center().x, (k.height() * 3) / 5),
	]);
	k.add([
		k.text("Click or press Enter to return to Main Menu", {
			size: 50,
			align: "center",
			font: gameStateManager.font,
			width: k.width(),
		}),
		k.anchor("center"),
		k.color("#ffffff"),
		k.pos(k.center().x, (k.height() * 4) / 5),
	]);

	k.onMousePress(() => {
		k.go("main-menu");
	});
	k.onKeyPress("enter", () => {
		k.go("main-menu");
	});

	k.play("hit");

	k.wait(0.5, () => {
		k.play("hit");
		finalScoreObj.opacity = 1;
	});
	k.wait(1, () => {
		k.play("hit");
		highScoreObj.opacity = 1;
	});
}
