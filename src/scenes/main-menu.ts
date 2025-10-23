import { gameConstants } from "../constants";
import k from "../kaplayCtx";
import { addTextShadow } from "../utils";

export function loadMainMenu() {
  k.add([
    k.sprite("background"),
    k.pos(0),
    k.opacity(0.5)
  ]);

  // Game Title
  const titleText = k.add([
    k.text("Boneheads Typing", {
      size: 100,
      font: "voya-nui",
      align: "center",
    }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y-200),
    k.color("#aaaa77"),
    k.z(gameConstants.TEXT_Z)
  ]);
  addTextShadow(titleText);

  // Start Game Button
  const startButton = k.add([
    k.text("Start Game", {
      size: 64,
      font: "voya-nui",
      align: "center"
    }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y - 50),
    k.color(gameConstants.BUTTON_DEFAULT_COLOR),
    k.z(gameConstants.TEXT_Z),
    k.area()
  ]);
  addTextShadow(startButton);

  const startButtonDecor = startButton.add([
    k.sprite("avokahtamer", { anim: "run" }),
    k.anchor("center"),
    k.pos(-startButton.width / 2 - 60, -10),
    k.scale(gameConstants.SPRITE_SCALE),
    k.opacity(0)
  ]);
  startButton.onHover(() => {
    startButton.color = k.rgb(gameConstants.BUTTON_HOVER_COLOR);
    startButtonDecor.opacity = 1;
  });
  startButton.onHoverEnd(() => {
    startButton.color = k.rgb(gameConstants.BUTTON_DEFAULT_COLOR)
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
    k.color(gameConstants.BUTTON_DEFAULT_COLOR),
    k.area(),
    k.z(gameConstants.TEXT_Z)
  ]);
  addTextShadow(charSelectButton)

  const charSelectButtonDecor = charSelectButton.add([
    k.sprite("avokahtamer", { anim: "run" }),
    k.anchor("center"),
    k.pos(-charSelectButton.width / 2 - 60, -10),
    k.scale(gameConstants.SPRITE_SCALE),
    k.opacity(0)
  ]);
  charSelectButton.onHover(() => {
    charSelectButton.color = k.rgb(gameConstants.BUTTON_HOVER_COLOR);
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