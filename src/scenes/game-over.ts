import k from "../kaplayCtx";

export function loadGameOver() {
	k.add([k.sprite("background"), k.pos(0), k.opacity(0.5)]);
	k.add([
		k.text("u suk", {
			size: 100,
			align: "center",
		}),
		k.anchor("center"),
		k.pos(k.center()),
		k.color("#ffffff"),
	]);
	k.onMousePress(() => {
		k.go("main-menu");
	});
}
