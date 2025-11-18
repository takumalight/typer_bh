import type { Enemy } from "./enemy";
import k from "../kaplayCtx";
import type { GameObj, TextComp } from "kaplay";
import { gameConstants } from "../constants";
import { gameStateManager } from "../main";

export type WordObj = ReturnType<typeof addWord>;
export type BoxObj = ReturnType<typeof addWordBox>;

export function addWord(hostEnemy: Enemy, challengeWord: string) {
	return hostEnemy.add([
		"challengeWord",
		k.text(challengeWord, {
			align: "center",
			font: gameStateManager.hardMode
				? "matoran-font"
				: gameStateManager.font,
			size: gameConstants.CHALLENGE_WORD_SIZE,
		}),
		k.anchor("center"),
		k.pos(0, -30),
		k.z(2),
		{
			currentIndex: 0,
			add(this: GameObj<TextComp | { currentIndex: number }>): void {
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
}

export function addWordBox(hostEnemy: Enemy, width: number, height: number) {
	return hostEnemy.add([
		"challengeWordBox",
		k.rect(width + 4, height + 2, {
			radius: 3,
		}),
		k.anchor("center"),
		k.color(k.rgb("#000000")),
		k.opacity(1),
		k.pos(0, -30),
		k.z(1),
	]);
}

/* export function addWordShadow(
	hostEnemy: Enemy,
	challengeWord: string
): WordShadowObj {
	return hostEnemy.add([
		"challengeWordShadow",
		k.text(challengeWord, {
			align: "center",
			font: gameStateManager.hardMode
				? "matoran-font"
				: gameStateManager.font,
			size: gameConstants.CHALLENGE_WORD_SIZE,
		}),
		k.anchor("bot"),
		k.color("#000000"),
		k.pos(1, -19),
	]);
} */
