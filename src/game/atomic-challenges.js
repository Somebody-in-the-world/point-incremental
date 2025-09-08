import { Challenge } from "./challenge";
import Decimal from "break_eternity.js";
import { atomicReset } from "./resets";
import { canAtomic, atomicPrestige } from "./atomic";
import { Effect } from "./effect";

class AtomicChallenge extends Challenge {
    constructor(id, desc, goal, reward, effect, cost){
        super(id, desc, goal, reward, effect);
        this.cost = cost;
    }

    start(){
        if(!this.canStart) return;
        player.quarks -= this.cost;
        if(canAtomic()) atomicPrestige();
        else atomicReset();
        player.currentAtomicChallenge = this.id;
    }

    complete(){
        player.atomicChallengeCompletions[this.id-1] += this.gainedCompletions;
        this.exit();
    }

    get effect(){
        if(!this.effectObject) throw new TypeError("This challenge instance does not contain an effect.");
        return this.effectObject.formula(this.completions);
    }

    exit(){
        player.currentAtomicChallenge = 0;
        player.quarks += this.cost;
        if(canAtomic()) atomicPrestige();
        else atomicReset();
    }

    get canStart(){ return player.quarks >= this.cost; }
    get gainedCompletions(){ 
        return Math.max(player.spacetimePoints.add(1).log(10)
            .div(this.goal.log(10)).toNumber() - 
            player.atomicChallengeCompletions[this.id-1], 0);
    }
    get canComplete(){ return player.spacetimePoints.gte(this.goal) && (this.gainedCompletions > 0); }
    get completions(){ return player.atomicChallengeCompletions[this.id-1]; }
    get isRunning(){ return player.currentAtomicChallenge == this.id; }
    get canUnlock(){}
    get unlocked(){ return player.totalQuarks >= atomicChallengeRequirements[this.id-1]; }
    unlock(){}
}

const challengeDescriptions = [
    "All spacetime challenges at once",
    "Increased SP multiplier cost scalling starts immediately (Normally at 1e20000 SP)",
    "Dark generators are disabled"
];

const challengeGoals = [
    new Decimal("1e2000"),
    new Decimal("1e10000"),
    new Decimal("1e4000")
];

const challengeRewards = [
    "Gain a multiplier to particle gain",
    "Increased SP multiplier cost scalling starts later",
    "Dark generator multiplier based on gravity"
];

const challengeEffects = [
    new Effect((completions) => new Decimal(5).pow(completions**0.75), "mult"),
    new Effect((completions) => new Decimal(1).add(completions/15), "power"),
    new Effect((completions) => player.gravity.pow(completions*2.5), "mult")
];

const challengeCosts = [
    25, 40, 30
]

export const atomicChallengeRequirements = [
    55, 70, 75
];

export const atomicChallenges = (function(){
    const challs = [];
    for(const id in challengeGoals){
        challs.push(new AtomicChallenge(
            Number(id) + 1, challengeDescriptions[id], 
            challengeGoals[id], challengeRewards[id],
            challengeEffects[id], challengeCosts[id]
        ));
    }
    return challs;
})();

export function calcUnlockedAtomicChalls(){
    let challs = 0;
    for(const chall of atomicChallenges){
        if(chall.unlocked) challs++;
    }
    return challs;
}
