import { Challenge } from "./challenge";
import Decimal from "break_eternity.js";
import { spacetimeReset } from "./resets";
import { canSpacetime, spacetimePrestige } from "./spacetime";
import { Effect } from "./effect";
import { calcChall2FreePointUpgrades } from "./dimensional";

class SpacetimeChallenge extends Challenge {
    constructor(id, desc, goal, reward, effect){
        super(id, desc, goal, reward, effect);
    }

    start(){
        if(canSpacetime()) spacetimePrestige();
        else spacetimeReset();
        player.currentChallenge = this.id;
    }

    complete(){
        player.challengeCompletions[this.id-1] = true;
        this.exit();
    }

    exit(){
        player.currentChallenge = 0;
        if(canSpacetime()) spacetimePrestige();
        else spacetimeReset();
    }

    get canComplete(){ return player.points.gte(this.goal); }
    get completed(){ return player.challengeCompletions[this.id-1]; }
    get isRunning(){ return (player.currentChallenge == this.id) || (player.currentAtomicChallenge == 1); }
    get canUnlock(){ return player.points.gte(unlockPointReq[this.id-1]); }
    get unlocked(){ return player.latestUnlockedChallenge >= this.id; }
    unlock(){ player.latestUnlockedChallenge = this.id; }
}

const challengeDescriptions = [
    "Compressed points does not provide any boost and automation points effect is capped at 100%",
    "Point upgrade multiplier is always 2x",
    "Point gain ^0.65",
    "Dimensions are disabled",
    "Point upgrades have no effect",
    "There is an exponententially rising anti-points that resets on dimensional dividing points"
];

const challengeGoals = [
    new Decimal("1e350"),
    new Decimal("1e625"),
    new Decimal("1e600"),
    new Decimal("1e3000"),
    new Decimal("1e3750"),
    new Decimal("1e10000")
];

const challengeRewards = [
    "Make the CP and AP formula better",
    "Dimensional power gives free point upgrades",
    "Point gain ^1.05",
    "Dimension per purchase multiplier is increased (2x -> 2.5x)",
    "Divide point upgrade costs based on dark matter",
    "Dark matter multiplier based on SP"
];

export const unlockPointReq = [
    new Decimal("1e1000"),
    new Decimal("1e1250"),
    new Decimal("1e1800"),
    new Decimal("1e6000"),
    new Decimal("1e8000"),
    new Decimal("1e11111")
];

const challengeEffect = [
    null, 
    new Effect(calcChall2FreePointUpgrades, "add"),
    null, null, 
    new Effect(() => Decimal.min(player.darkMatter.add(1)
        .mul(1e5).pow(180), "1e1000000"), "div"),
    new Effect(() => player.spacetimePoints.add(1).log(10)
        .add(1).pow(1.25), "mult")
];

export const spacetimeChallenges = (function(){
    const challs = [];
    for(const id in challengeGoals){
        challs.push(new SpacetimeChallenge(
            Number(id) + 1, challengeDescriptions[id], 
            challengeGoals[id], challengeRewards[id],
            challengeEffect[id]
        ));
    }
    return challs;
})();

export function calcTotalSpacetimeChallengesCompleted(){
    let challs = 0;
    for(const chall of spacetimeChallenges){
        if(chall.completed) challs++;
    }
    return challs;
}
