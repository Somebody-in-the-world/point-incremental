import Decimal from "break_eternity.js"
import { achievements } from "./achievements";
import { resetGame } from "./saving";
import { startOfflineProgress } from "./offline-progress";

window.dev = {
    timeSpeed: new Decimal(1),
    giveAllAchievements(){
        for(const achievement of achievements){
            achievement.unlock();
        }
    },
    multiplyEverything(factor){
        for(const prop in player){
            if(player[prop] instanceof Decimal) player[prop] = player[prop].mul(factor);
        }
    },
    fixSave(){
        for(const prop in player){
            if((isNaN(player[prop].mag) || player[prop].mag == null) && (player[prop] instanceof Decimal)){
                player[prop] = new Decimal(0);
            }
        }
    },
    doubleEverything(){
        this.multiplyEverything(new Decimal(2));
    },
    resetGame,
    startOfflineProgress
};
