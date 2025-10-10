import { makePlayer } from "../entities/player";
import k from "../kaplayCtx";

export function loadGame() {
  k.add([
    k.sprite("background"),
    k.pos(0)
  ]);

  const player = makePlayer(k.vec2(20, 625), "avokahtamer");
}