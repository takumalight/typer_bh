import k from "../kaplayCtx";

export function loadMainMenu() {
  k.add([
    k.sprite("background"),
    k.pos(0),
    k.opacity(0.5)
  ]);

  k.add([
    k.text("Boneheads Typing", {
      size: 100,
      font: "voya-nui",
      align: "center",
    }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y-200),
    k.color("#aaaa77"),
  ]);

  const startButton = k.add([
    k.text("Start Game", {
      size: 64,
      font: "voya-nui",
      align: "center"
    }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y - 50),
    k.color("#ffffff"),
    k.area()
    
  ]);
  startButton.onHover(() => {
    startButton.color = k.rgb("#555555");
  });
  startButton.onHoverEnd(() => {
    startButton.color = k.rgb("#ffffff")
  });
  startButton.onClick(() => {
    k.go("game");
  });

  const charSelectButton = k.add([
    k.text("Character Select", {
      size: 64,
      font: "voya-nui",
      align: "center"
    }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y + 50),
    k.color("#ffffff"),
    k.area()
  ]);
  charSelectButton.onHover(() => {
    charSelectButton.color = k.rgb("#555555");
  });
  charSelectButton.onHoverEnd(() => {
    charSelectButton.color = k.rgb("#ffffff");
  });
  charSelectButton.onClick(() => {
    k.go("character-select");
  });
}