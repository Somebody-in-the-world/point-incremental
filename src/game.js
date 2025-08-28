import Decimal from "break_eternity.js";
import "./game/player";
import { createApp } from 'vue';
import GameUI from "./GameUI.vue";
import "./game/events";
import { gameLoop } from "./game/gameloop";
import { format } from "./game/format";
import { loadGame, saveGame } from "./game/saving";
import { achievements } from "./game/achievements";
import { applyTheme } from "./game/themes";

export function init(){
    window.Decimal = Decimal;
    window.achievements = achievements;
    loadGame();
    startSaving();

    const globalMixin = {
        created(){
            if(this.update){
                Events.UI.add(GAME_EVENTS.GAME_TICK, this.update, this);
                Events.UI.add(GAME_EVENTS.GAME_TICK, () => {this._tickUpdate++;}, this);
                this.update();
            }
        },
        data(){
            return {
                _tickUpdate: 0
            };
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

    startGameLoop();
    applyTheme();
    startUpdateUI();
}

export function startGameLoop(){
    requestAnimationFrame(gameLoop);
}

export function startSaving(){
    saveGame();
    setTimeout(startSaving, player.options.saveInterval);
}

export function startUpdateUI(){
    Events.UI.dispatch(GAME_EVENTS.GAME_TICK);
    setTimeout(startUpdateUI, player.options.updateRate);
}
