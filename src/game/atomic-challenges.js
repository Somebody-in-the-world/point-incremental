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
    get completed(){ return this.completions >= 1; }
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
    "Dark generators are disabled",
    "All multipliers to point gain (except point upgrades) are disabled and AP effect is always 100%, but point upgrade effect becomes 1e100x",
    ""
];

const challengeGoals = [
    new Decimal("1e2000"),
    new Decimal("1e10000"),
    new Decimal("1e4000"),
    new Decimal("1e3000"),
    new Decimal("1e1e15")
];

const challengeRewards = [
    "Gain a multiplier to particle gain",
    "Increased SP multiplier cost scalling starts later",
    "Dark generator multiplier based on gravity",
    "Point upgrades are stronger based on strong force",
    ""
];

const challengeEffects = [
    new Effect((completions) => new Decimal(5).pow(completions**0.75), "mult"),
    new Effect((completions) => new Decimal(1).add(completions/15), "power"),
    new Effect((completions) => player.gravity.pow(completions*2.5), "mult"),
    new Effect((completions) => player.strongForce.add(1).log(10).mul(completions).add(1).log(10).div(3).add(1).pow(0.75), "power"),
    null
];

const challengeCosts = [
    25, 40, 30, 80, 99999999
]

export const atomicChallengeRequirements = [
    55, 70, 75, 90, 99999999
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
