import k from "./kaplayCtx";
import { loadCharacterSelect } from "./scenes/character-select";
import { loadGame } from "./scenes/game";
import { loadGameOver } from "./scenes/game-over";
import { loadMainMenu } from "./scenes/main-menu";

// Load Sprites
k.loadSprite("background", "graphics/Mysterious_Exit.PNG");
// Load Sonds
// Load Fonts
k.loadFont("voya-nui", "fonts/VoyaNui.ttf")

// Scene List
k.scene("main-menu", loadMainMenu);
k.scene("character-select", loadCharacterSelect);
k.scene("game", loadGame);
k.scene("game-over", loadGameOver);

// Run
k.go("main-menu");