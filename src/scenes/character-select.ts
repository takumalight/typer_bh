import { gameConstants } from "../constants";
import k from "../kaplayCtx";
import { gameStateManager } from "../main";

export function loadCharacterSelect() {
	k.add([k.sprite("background"), k.pos(0), k.opacity(0.5)]);

	type CharacterList = Record<string, string>;

	const characterList: CharacterList = {
		avohkahtamer: "Avohkah Tamer",
		ven: "Venom",
	};

	function populateCharacterSelection(characterList: CharacterList) {
		const maxPopX = 4;

		let col = 1;
		let row = 1;
		for (const key of Object.keys(characterList)) {
			const charSelectArea = k.add([
				k.rect(k.width() / 6, k.width() / 6, {
					// fill: false,
					radius: 5,
				}),
				k.outline(5, k.rgb("#888888")),
				k.anchor("bot"),
				k.area(),
				k.color("#000000"),
				k.opacity(0.75),
				k.pos((k.width() / 5) * col, 300 * row),
			]);
			charSelectArea.add([
				k.sprite(key, {
					anim: "run",
				}),
				k.anchor("bot"),
				k.area(),
				k.pos(0, -10),
				k.scale(gameConstants.SPRITE_SCALE),
			]);
			charSelectArea.add([
				k.text(characterList[key], {
					align: "center",
					font: gameStateManager.font,
					size: 28,
					width: charSelectArea.width,
				}),
				k.anchor("top"),
				k.pos(0, -charSelectArea.height + 10),
			]);
			charSelectArea.onHover(() => {
				charSelectArea.outline.color = k.rgb(
					gameConstants.BUTTON_HOVER_COLOR
				);
			});
			charSelectArea.onHoverEnd(() => {
				charSelectArea.outline.color = k.rgb("#888888");
			});
			charSelectArea.onClick(() => {
				k.setData("pref-char", String(key));
				gameStateManager.character = String(key);
				k.go("main-menu");
			});

			col++;
			if (col === maxPopX) {
				col = 1;
				row++;
			}
		}
	}

	populateCharacterSelection(characterList);
}
