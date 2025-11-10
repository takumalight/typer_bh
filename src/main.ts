import k from "./kaplayCtx";
import { loadCharacterSelect } from "./scenes/character-select";
import { loadGame } from "./scenes/game";
import { loadGameOver } from "./scenes/game-over";
import { loadMainMenu } from "./scenes/main-menu";

// Set Layers
k.setLayers(["bg", "obj", "ui"], "obj");

// Load Sprites
k.loadSprite("background", "graphics/Mysterious_Exit.PNG");
k.loadSprite("avokahtamer", "graphics/characters/bh_spritesheet_at.png", {
	sliceX: 8,
	sliceY: 4,
	anims: {
		idle: 0,
		walk: { from: 8, to: 13, loop: true, speed: 8 },
		run: { from: 16, to: 23, loop: true, speed: 15 },
		attack: { from: 24, to: 29, loop: false, speed: 20 },
	},
});
k.loadSprite("axlerex", "graphics/enemies/new_axlerex.png", {
	sliceX: 8,
	sliceY: 4,
	anims: {
		move: { from: 0, to: 5, loop: true, speed: 16 },
		attack: { from: 7, to: 13, loop: false, speed: 8 },
		die: { from: 16, to: 23, loop: false, speed: 8 },
	},
});
k.loadSprite("foohrok", "graphics/enemies/foohrok_roll.png", {
	sliceX: 8,
	sliceY: 4,
	anims: {
		move: { from: 0, to: 7, loop: true, speed: 16 },
		unroll: { from: 8, to: 11, loop: false, speed: 8 },
		attack: { from: 12, to: 18, loop: false, speed: 8 },
		die: { from: 19, to: 23, loop: false, speed: 8 },
	},
});
k.loadSprite("rama", "graphics/enemies/rama.png", {
	sliceX: 8,
	sliceY: 3,
	anims: {
		move: { from: 0, to: 7, loop: true, speed: 16 },
		attack: { from: 17, to: 19, loop: false, speed: 8 },
		die: { from: 20, to: 23, loop: false, speed: 8 },
	},
});
// Load Sounds
k.loadSound("hit", "sounds/610280__brickdeveloper171__retro-hit-sound.wav");
k.loadSound(
	"game-music",
	"sounds/333795__frankum__electronic-music-loop-m1.mp3"
);
// Load Fonts
k.loadFont("voya-nui", "fonts/VoyaNui.ttf");

// Scene List
k.scene("main-menu", loadMainMenu);
k.scene("character-select", loadCharacterSelect);
k.scene("game", loadGame);
k.scene("game-over", loadGameOver);

// Run
k.go("main-menu");
