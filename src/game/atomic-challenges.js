import { Challenge } from "./challenge";
import Decimal from "break_eternity.js";
import { atomicReset } from "./resets";
import { canAtomic, atomicPrestige } from "./atomic";

class AtomicChallenge extends Challenge {
    constructor(id, desc, goal, reward){
        super(id, desc, goal, reward);
    }

    start(){
        if(canAtomic()) atomicPrestige();
        else atomicReset();
        player.currentAtomicChallenge = this.id;
    }

    complete(){
        player.atomicChallengeCompletions[this.id-1] = true;
        this.exit();
    }

    exit(){
        player.currentAtomicChallenge = 0;
        if(canAtomic()) atomicPrestige();
        else atomicReset();
    }

    get canComplete(){ return player.spacetimePoints.gte(this.goal); }
    get completed(){ return player.atomicChallengeCompletions[this.id-1]; }
    get isRunning(){ return player.currentAtomicChallenge == this.id; }
    get canUnlock(){}
    get unlocked(){ return true; }
    unlock(){}
}

const challengeDescriptions = [
    "All spacetime challenges at once"
];

const challengeGoals = [
    new Decimal("1e3500")
];

const challengeRewards = [
    "Do something"
];

export const atomicChallenges = (function(){
    const challs = [];
    for(const id in challengeGoals){
        challs.push(new AtomicChallenge(
            Number(id) + 1, challengeDescriptions[id], 
            challengeGoals[id], challengeRewards[id], null
        ));
    }
    return challs;
})();
