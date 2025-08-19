import { Challenge } from "./challenge";
import Decimal from "break_eternity.js";

const challengeDescriptions = [
    "Compressed points does not provide any boost and automation points effect is capped at 100%",
    "Point upgrade multiplier is always 2x",
    "Point gain ^0.65",
    "Dimensions are disabled",
    "Point upgrades have no effect",
    "There is an exponententially rising anti-points that resets on dimensional dividing points",
    "Placeholder"
];

const challengeGoals = [
    new Decimal("1e350"),
    new Decimal("1e600"),
    new Decimal("1e555"),
    new Decimal("1e3000"),
    new Decimal("1e3750"),
    new Decimal("1e10000"),
    new Decimal("1e1e10")
];

const challengeRewards = [
    "Make the CP and AP formula better",
    "Dimensional power gives free point upgrades",
    "Point gain ^1.05",
    "Dimension per purchase multiplier is increased (2x -> 2.5x)",
    "Divide point upgrade costs based on dark matter",
    "All dark generators are more powerful based on SP",
    "Placeholder"
];

export const unlockPointReq = [
    new Decimal("1e1000"),
    new Decimal("1e1400"),
    new Decimal("1e1700"),
    new Decimal("1e6000"),
    new Decimal("1e8000"),
    new Decimal("1e11111"),
    new Decimal("1e1e10")
];

export const challenges = (function(){
    const challs = [];
    for(const id in challengeGoals){
        challs.push(new Challenge(
            Number(id) + 1, challengeDescriptions[id], challengeGoals[id],
            challengeRewards[id], unlockPointReq[id],
            (challId) => player.latestUnlockedChallenge >= challId,
            (challId) => {player.latestUnlockedChallenge = challId;}
        ));
    }
    return challs;
})();

export function calcTotalChallsCompleted(){
    let challs = 0;
    for(const chall of challenges){
        if(chall.completed) challs++;
    }
    return challs;
}
