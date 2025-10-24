import { gameConstants } from "../constants";
import { makeEnemy, type Enemy } from "../entities/enemy";
import { makePlayer } from "../entities/player";
import k from "../kaplayCtx";
import { wordBank } from "../word-bank";

export function loadGame() {
  k.add([
    k.sprite("background"),
    k.pos(0)
  ]);

  // Game Logic
  const addWord = (hostEnemy: Enemy) => {
    const challengeWord = wordBank[k.randi(wordBank.length)];

    return hostEnemy.add([
      k.text(challengeWord, {
        align: "center",
        font: "voya-nui",
        size: gameConstants.CHALLENGE_WORD_SIZE,
      }),
      k.anchor("bot"),
      k.color("#ffffff"),
      k.pos(0, -hostEnemy.height + 10),
    ]);
  };

  const spawnEnemy = () => {
    const enemyList: string[] = [
      "axlerex",
      "foohrok",
    ];

    const randEnemy = enemyList[k.randi(enemyList.length)];

    const enemy = makeEnemy(k.vec2(k.width() + 50, k.randi(600, k.height())), randEnemy);
    addWord(enemy);
    enemy.onUpdate(() => {
      enemy.move(-25, 0);
    });

    const waitTime = 5;
    k.wait(waitTime, spawnEnemy);
  };

  // Level start "cutscene"
  const player = makePlayer(k.vec2(-50, 625), "avokahtamer");
  player.animate("pos", [player.pos, k.vec2(100, player.pos.y)], {
    duration: 3,
    loops: 1,
    
  })
  player.onAnimateFinished(() => {
    player.play("idle");
    spawnEnemy();
  })
  // End "cutscene"

  k.onUpdate(() => {
    // player.move(100,0);
  });
}