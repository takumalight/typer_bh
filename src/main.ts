import k from "./kaplayCtx";
import { loadCharacterSelect } from "./scenes/character-select";
import { loadGame } from "./scenes/game";
import { loadGameOver } from "./scenes/game-over";
import { loadMainMenu } from "./scenes/main-menu";

// Load Sprites
k.loadSprite("background", "graphics/Mysterious_Exit.PNG");
k.loadSprite("avokahtamer", "graphics/characters/bh_spritesheet_at.png", {
    sliceX: 8,
    sliceY: 4,
    "anims": {
        idle: 0,
        walk: { from: 8, to: 13, loop: true, speed: 8 },
        run: { from: 16, to: 23, loop: true, speed: 15 },
        attack: { from: 24, to: 29, loop: false, speed: 15 }
    }
});
k.loadSprite("axlerex", "/graphics/enemies/new_axlerex.png", {
    sliceX: 8,
    sliceY: 4,
    "anims": {
        move: { from: 0, to: 5, loop: true, speed: 8},
        attack: { from: 7, to: 13, loop: false, speed: 8},
        die: { from: 16, to: 23, loop: false, speed: 8 }
    }
});
// Load Sounds
// Load Fonts
k.loadFont("voya-nui", "fonts/VoyaNui.ttf")

// Scene List
k.scene("main-menu", loadMainMenu);
k.scene("character-select", loadCharacterSelect);
k.scene("game", loadGame);
k.scene("game-over", loadGameOver);

// Run
k.go("main-menu");