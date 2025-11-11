import k from "../kaplayCtx";

export function loadGameOver() {
	let highScore = k.getData("high-score") ?? 0;
	const finalScore = k.getData("final-score");
	if (finalScore && finalScore > highScore) {
		k.setData("high-score", finalScore);
		highScore = finalScore;
	}
	k.add([k.sprite("background"), k.pos(0), k.opacity(0.5)]);
	k.add([
		k.text(`u suk\nFinal Score: ${finalScore}\nHigh Score: ${highScore}`, {
			size: 75,
			align: "center",
			font: "voya-nui",
		}),
		k.anchor("center"),
		k.pos(k.center()),
		k.color("#ffffff"),
	]);
	k.onMousePress(() => {
		k.go("main-menu");
	});
}
