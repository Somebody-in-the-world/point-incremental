import Decimal from "break_eternity.js"
import { achievements } from "./achievements";
import { resetGame } from "./saving";

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
    doubleEverything(){
        this.multiplyEverything(new Decimal(2));
    },
    resetGame
};
