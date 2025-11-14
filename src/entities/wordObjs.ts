import type { Enemy } from "./enemy";
import k from "../kaplayCtx";
import type { GameObj, TextComp, PosComp, AnchorComp, ColorComp } from "kaplay";
import { gameConstants } from "../constants";
import { gameStateManager } from "../main";

export type WordObj = GameObj<
	| PosComp
	| AnchorComp
	| TextComp
	| {
			currentIndex: number;
			add(this: GameObj<TextComp & { currentIndex: number }>): void;
	  }
>;
export type WordShadowObj = GameObj<
	TextComp | PosComp | AnchorComp | ColorComp
>;

export function addWord(hostEnemy: Enemy, challengeWord: string): WordObj {
	return hostEnemy.add([
		"challengeWord",
		k.text(challengeWord, {
			align: "center",
			font: gameStateManager.font,
			size: gameConstants.CHALLENGE_WORD_SIZE,
		}),
		k.anchor("bot"),
		k.pos(0, -20),
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

export function addWordShadow(
	hostEnemy: Enemy,
	challengeWord: string
): WordShadowObj {
	return hostEnemy.add([
		"challengeWordShadow",
		k.text(challengeWord, {
			align: "center",
			font: gameStateManager.font,
			size: gameConstants.CHALLENGE_WORD_SIZE,
		}),
		k.anchor("bot"),
		k.color("#000000"),
		k.pos(1, -19),
	]);
}
