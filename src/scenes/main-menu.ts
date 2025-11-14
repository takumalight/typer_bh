import { gameConstants } from "../constants";
import k from "../kaplayCtx";
import { gameStateManager } from "../main";
import { addTextShadow } from "../utils";

export function loadMainMenu() {
	k.add([k.sprite("background"), k.pos(0), k.opacity(0.5)]);

	// Game Title
	const titleText = k.add([
		k.text("Boneheads Typing", {
			size: 100,
			font: gameStateManager.font,
			align: "center",
		}),
		k.anchor("center"),
		k.layer("ui"),
		k.pos(k.center().x, k.center().y - 200),
		k.color("#aaaa77"),
		k.z(gameConstants.TEXT_Z),
	]);
	addTextShadow(titleText);

	// Start Game Button
	const startButton = k.add([
		k.text("Start Game", {
			size: 64,
			font: gameStateManager.font,
			align: "center",
		}),
		k.anchor("center"),
		k.area(),
		k.layer("ui"),
		k.pos(k.center().x, k.center().y - 50),
		k.color(gameConstants.BUTTON_DEFAULT_COLOR),
		k.z(gameConstants.TEXT_Z),
	]);
	addTextShadow(startButton);

	const startButtonDecor = startButton.add([
		"button-decor",
		k.sprite("avohkahtamer", { anim: "run" }),
		k.anchor("center"),
		k.pos(-startButton.width / 2 - 60, -10),
		k.scale(gameConstants.SPRITE_SCALE),
		k.opacity(0),
	]);
	startButton.onHover(() => {
		if (gameStateManager.menuOpen) return;
		startButton.color = k.rgb(gameConstants.BUTTON_HOVER_COLOR);
		startButtonDecor.opacity = 1;
	});
	startButton.onHoverEnd(() => {
		startButton.color = k.rgb(gameConstants.BUTTON_DEFAULT_COLOR);
		startButtonDecor.opacity = 0;
	});
	startButton.onClick(() => {
		if (gameStateManager.menuOpen) return;
		k.go("game");
	});

	// Character Select Button
	const charSelectButton = k.add([
		k.text("Character Select", {
			size: 64,
			font: gameStateManager.font,
			align: "center",
		}),
		k.anchor("center"),
		k.area(),
		k.layer("ui"),
		k.pos(k.center().x, k.center().y + 50),
		k.color(gameConstants.BUTTON_DEFAULT_COLOR),
		k.z(gameConstants.TEXT_Z),
	]);
	addTextShadow(charSelectButton);

	const charSelectButtonDecor = charSelectButton.add([
		"button-decor",
		k.sprite("avohkahtamer", { anim: "run" }),
		k.anchor("center"),
		k.pos(-charSelectButton.width / 2 - 60, -10),
		k.scale(gameConstants.SPRITE_SCALE),
		k.opacity(0),
	]);
	charSelectButton.onHover(() => {
		if (gameStateManager.menuOpen) return;
		charSelectButton.color = k.rgb(gameConstants.BUTTON_HOVER_COLOR);
		charSelectButtonDecor.opacity = 1;
	});
	charSelectButton.onHoverEnd(() => {
		charSelectButton.color = k.rgb(gameConstants.BUTTON_DEFAULT_COLOR);
		charSelectButtonDecor.opacity = 0;
	});
	charSelectButton.onClick(() => {
		if (gameStateManager.menuOpen) return;
		k.go("character-select");
	});

	// Settings Button
	const settingsButton = k.add([
		k.text("Settings", {
			size: 64,
			font: gameStateManager.font,
			align: "center",
		}),
		k.anchor("center"),
		k.area(),
		k.layer("ui"),
		k.pos(k.center().x, k.center().y + 150),
		k.color(gameConstants.BUTTON_DEFAULT_COLOR),
		k.z(gameConstants.TEXT_Z),
	]);
	addTextShadow(settingsButton);

	const settingsButtonsDecor = settingsButton.add([
		"button-decor",
		k.sprite("avohkahtamer", { anim: "run" }),
		k.anchor("center"),
		k.pos(-settingsButton.width / 2 - 60, -10),
		k.scale(gameConstants.SPRITE_SCALE),
		k.opacity(0),
	]);
	settingsButton.onHover(() => {
		if (gameStateManager.menuOpen) return;
		settingsButton.color = k.rgb(gameConstants.BUTTON_HOVER_COLOR);
		settingsButtonsDecor.opacity = 1;
	});
	settingsButton.onHoverEnd(() => {
		settingsButton.color = k.rgb(gameConstants.BUTTON_DEFAULT_COLOR);
		settingsButtonsDecor.opacity = 0;
	});
	settingsButton.onClick(() => {
		if (gameStateManager.menuOpen) return;
		gameStateManager.menuOpen = true;
		settingsMenu.animation.seek(0);
		settingsMenu.animate(
			"pos",
			[settingsMenu.pos, k.vec2(settingsMenu.pos.x, k.center().y - 200)],
			{
				duration: 0.75,
				loops: 1,
				easing: k.easings.easeOutBounce,
			}
		);
		/* k.tween(
			settingsMenu.pos.y,
			k.center().y - 200,
			0.75,
			(y) => (settingsMenu.pos = k.vec2(settingsMenu.pos.x, y)),
			k.easings.easeOutBounce
		); */
	});

	// Settings Menu
	const settingsMenu = k.add([
		k.rect(800, 400, {
			radius: 10,
		}),
		k.anchor("top"),
		k.animate(),
		k.color("#000000"),
		k.opacity(0.9),
		k.outline(12, k.rgb("#333333"), 1, "bevel"),
		k.pos(k.center().x, -410),
		k.layer("ui"),
		k.z(100),
	]);

	const closeSettingsButton = settingsMenu.add([
		k.rect(50, 50, {
			radius: 10,
		}),
		k.anchor("topright"),
		k.area(),
		k.color("#aaaaaa"),
		k.outline(5, k.rgb("#383838")),
		k.pos(settingsMenu.width / 2 - 15, 15),
	]);
	closeSettingsButton.add([
		k.text("X", {
			size: 56,
			font: "voya-nui",
			align: "center",
		}),
		k.anchor("center"),
		k.pos(
			-closeSettingsButton.width / 2,
			closeSettingsButton.height / 2 - 2
		),
		k.color("#FF0000"),
	]);
	closeSettingsButton.onHover(() => {
		closeSettingsButton.color = k.rgb("#666666");
	});
	closeSettingsButton.onHoverEnd(() => {
		closeSettingsButton.color = k.rgb("#aaaaaa");
	});
	closeSettingsButton.onClick(() => {
		gameStateManager.menuOpen = false;
		k.setData("pref-shake", gameStateManager.shake);
		k.setData("pref-font", gameStateManager.font);
		settingsMenu.animation.seek(0);
		settingsMenu.animate(
			"pos",
			[settingsMenu.pos, k.vec2(settingsMenu.pos.x, -410)],
			{
				duration: 0.75,
				loops: 1,
				easing: k.easings.easeOutBounce,
			}
		);
	});

	const fontSetting = settingsMenu.add([
		k.text(`Font Setting: ${gameStateManager.font}`, {
			size: 32,
			font: gameStateManager.font,
			align: "center",
		}),
		k.anchor("center"),
		k.area(),
		k.color(gameConstants.BUTTON_DEFAULT_COLOR),
		k.pos(0, (settingsMenu.height * 1) / 4),
	]);
	// addTextShadow(fontSetting);
	fontSetting.onHover(() => {
		fontSetting.color = k.rgb(gameConstants.BUTTON_HOVER_COLOR);
	});
	fontSetting.onHoverEnd(() => {
		fontSetting.color = k.rgb(gameConstants.BUTTON_DEFAULT_COLOR);
	});
	fontSetting.onClick(() => {
		if (gameStateManager.font === "voya-nui") {
			gameStateManager.font = "monospace";
		} else {
			gameStateManager.font = "voya-nui";
		}
		const fontObjs = k.get("*", {
			recursive: true,
		});
		for (const fontObj of fontObjs) {
			if (fontObj.has("text")) {
				fontObj.font = gameStateManager.font;
			}
		}
	});
	fontSetting.onDraw(() => {
		fontSetting.text = `Font Setting: ${gameStateManager.font}`;
	});

	const shakeSetting = settingsMenu.add([
		k.text(`Screen Shake: ${k.getData("pref-shake") ? "On" : "Off"}`, {
			size: 32,
			font: k.getData("pref-font") || "voya-nui",
			align: "center",
		}),
		k.anchor("center"),
		k.area(),
		k.color(gameConstants.BUTTON_DEFAULT_COLOR),
		k.pos(0, (settingsMenu.height * 1) / 2),
	]);
	// addTextShadow(shakeSetting);
	shakeSetting.onHover(() => {
		shakeSetting.color = k.rgb(gameConstants.BUTTON_HOVER_COLOR);
	});
	shakeSetting.onHoverEnd(() => {
		shakeSetting.color = k.rgb(gameConstants.BUTTON_DEFAULT_COLOR);
	});
	shakeSetting.onClick(() => {
		gameStateManager.shake = !gameStateManager.shake;
	});
	shakeSetting.onDraw(() => {
		shakeSetting.text = `Screen Shake: ${
			gameStateManager.shake ? "On" : "Off"
		}`;
	});

	const highScoreReset = settingsMenu.add([
		k.text(`Reset High Score (${k.getData("high-score")})`, {
			size: 32,
			font: gameStateManager.font,
			align: "center",
		}),
		k.anchor("center"),
		k.area(),
		k.color(gameConstants.BUTTON_DEFAULT_COLOR),
		k.pos(0, (settingsMenu.height * 3) / 4),
	]);
	// addTextShadow(highScoreReset);
	highScoreReset.onHover(() => {
		highScoreReset.color = k.rgb(gameConstants.BUTTON_HOVER_COLOR);
	});
	highScoreReset.onHoverEnd(() => {
		highScoreReset.color = k.rgb(gameConstants.BUTTON_DEFAULT_COLOR);
	});
	highScoreReset.onClick(() => {
		k.setData("high-score", 0);
		highScoreReset.text = `Reset High Score (${k.getData("high-score")})`;
	});
}
