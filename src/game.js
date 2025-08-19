import Decimal from "break_eternity.js";
import "./game/player";
import { createApp } from 'vue';
import GameUI from "./GameUI.vue";
import "./game/events";
import { gameLoop } from "./game/gameloop";
import { format } from "./game/format";
import { loadGame, saveGame } from "./game/saving";
import { achievements } from "./game/achievements";

export function init(){
    window.Decimal = Decimal;
    window.achievements = achievements;
    loadGame();
    startSaving();

    const globalMixin = {
        created(){
            if(this.update){
                Events.UI.add(GAME_EVENTS.GAME_TICK, this.update, this);
            }
        },
        unmounted(){
            Events.UI.removeAll(this);
        },
        methods: {
            format
        }
    };

    const app = createApp(GameUI);
    app.mixin(globalMixin);
    app.mount("#app");
}

export function startGameLoop(){
    gameLoop();
    setTimeout(startGameLoop, player.settings.updateRate);
}

export function startSaving(){
    saveGame();
    setTimeout(startSaving, 2000);
}


