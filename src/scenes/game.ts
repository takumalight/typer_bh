import { makePlayer } from "../entities/player";
import k from "../kaplayCtx";

export function loadGame() {
  k.add([
    k.sprite("background"),
    k.pos(0)
  ]);

  const player = makePlayer(k.vec2(-50, 625), "avokahtamer");
  player.animate("pos", [player.pos, k.vec2(100, player.pos.y)], {
    duration: 3,
    loops: 1
  })

  k.onUpdate(() => {
    // player.move(100,0);
  });
}