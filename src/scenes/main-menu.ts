import k from "../kaplayCtx";

export function loadMainMenu() {
  k.add([
    k.sprite("background"),
    k.pos(0),
    k.opacity(0.5)
  ]);

  // Game Title
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

  // Start Game Button
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
  const startButtonDecor = startButton.add([
    k.sprite("avokahtamer", { anim: "run" }),
    k.anchor("center"),
    k.pos(-startButton.width / 2 - 60, -10),
    k.scale(2),
    k.opacity(0)
  ]);
  startButton.onHover(() => {
    startButton.color = k.rgb("#555555");
    startButtonDecor.opacity = 1;
  });
  startButton.onHoverEnd(() => {
    startButton.color = k.rgb("#ffffff")
    startButtonDecor.opacity = 0;
  });
  startButton.onClick(() => {
    k.go("game");
  });

  // Character Select Button
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
  const charSelectButtonDecor = charSelectButton.add([
    k.sprite("avokahtamer", { anim: "run" }),
    k.anchor("center"),
    k.pos(-charSelectButton.width / 2 - 60, -10),
    k.scale(2),
    k.opacity(0)
  ]);
  charSelectButton.onHover(() => {
    charSelectButton.color = k.rgb("#555555");
    charSelectButtonDecor.opacity = 1;
  });
  charSelectButton.onHoverEnd(() => {
    charSelectButton.color = k.rgb("#ffffff");
    charSelectButtonDecor.opacity = 0;
  });
  charSelectButton.onClick(() => {
    k.go("character-select");
  });
}