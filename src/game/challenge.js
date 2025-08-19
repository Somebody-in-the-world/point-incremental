import { spacetimeReset } from "./resets";
import { canSpacetime, spacetimePrestige } from "./spacetime";

export class Challenge {
    constructor(id, desc, goal, reward, unlockPointReq, unlockedGetter, unlockedSetter){
        this.id = id;
        this.desc = desc;
        this.goal = goal;
        this.reward = reward;
        this.unlockedGetter = unlockedGetter;
        this.unlockedSetter = unlockedSetter;
        this.unlockPointReq = unlockPointReq;
    }

    start(){
        spacetimeReset();
        player.currentChallenge = this.id;
    }

    complete(){
        player.challengeCompletions[this.id - 1] = true;
        player.currentChallenge = 0;
        this.exit();
    }

    exit(){
        if(canSpacetime()){
            spacetimePrestige();
        } else {
            spacetimeReset();
        }
    }

    get canComplete(){
        return player.points.gte(this.goal);
    }

    get completed(){
        return player.challengeCompletions[this.id - 1];
    }
    
    get isRunning(){
        return this.id == player.currentChallenge;
    }

    get canUnlock(){
        return player.points.gte(this.unlockPointReq);
    }

    get unlocked(){
        return this.unlockedGetter(this.id);
    }

    unlock(){
        this.unlockedSetter(this.id);
    }
}
