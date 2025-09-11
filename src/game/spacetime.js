import { INFINITY } from "./constants";
import { spacetimeReset } from "./resets";
import { Purchasable } from "./purchasable";
import { Effect } from "./effect";
import Decimal from "break_eternity.js";
import { dimensions } from "./dimensional";
import { Milestone } from "./milestone";
import { spacetimeChallenges } from "./spacetime-challenges";
import { tearSpacetimeUpgrades } from "./tear-spacetime";
import { nonRepeatableQuantumUpgrades, quantumUpgrades } from "./quantum";
import { atomicChallenges } from "./atomic-challenges";

let passiveSPGenCounter = 0;

export function passiveGenerateSP(deltaTime){
    if(spacetimeUpgrades[5].boughtAmount){
        passiveSPGenCounter += deltaTime;
        if(passiveSPGenCounter >= player.records.fastestSpacetime*10){
            player.spacetimePoints = player.spacetimePoints.add(spacetimePointMultiplier.effect);
            passiveSPGenCounter = 0;
        }
    }
    player.spacetimePoints = player.spacetimePoints.add(
        tearSpacetimeUpgrades[13].effect.mul(player.records.highestSPPerMin)
        .mul(deltaTime).div(60)
    );
}

export function calcSpacetimeReq(){
    if(player.currentChallenge == 0) return INFINITY;
    else return spacetimeChallenges[player.currentChallenge-1].goal;
}

export function canSpacetime(){
    return player.points.gte(calcSpacetimeReq());
}

export function calcSPMultCostIncreaseThreesold(){
    if(atomicChallenges[1].isRunning) return new Decimal(10);
    return new Decimal("1e20000").pow(atomicChallenges[1].effect);
}

export function automaticSPGainTick(deltaTime){
    if(nonRepeatableQuantumUpgrades[5].boughtAmount){
        player.spacetimePoints = player.spacetimePoints.add(
            calcSpacetimePointsGain().div(100).mul(deltaTime)
        );
    }
}

export function bulkBuySPMult(){
    if(player.spacetimePoints.lt(1)) return;

    let amount;
    let loopOver = false;
    
    if(spacetimePointMultiplier.cost.lt(calcSPMultCostIncreaseThreesold())){
        const cap = calcSPMultThreesold() - spacetimePointMultiplier.boughtAmount;
        amount = Math.floor(Math.max(Math.min(player.spacetimePoints.div(spacetimePointMultiplier.cost)
            .log(25).add(1).toNumber(), cap), 0));
        if(amount == cap) loopOver = true;
    } else {
        amount = Math.floor(Math.max(player.spacetimePoints
            .div(spacetimePointMultiplier.cost).log(1000).add(1).toNumber(), 0));
    }

    if(amount < 1) return;

    spacetimePointMultiplier.boughtAmount += amount;
    const cost = spacetimePointMultiplier.formula(spacetimePointMultiplier.boughtAmount-1);

    if(player.spacetimePoints.gte(cost)){
        player.spacetimePoints = player.spacetimePoints.sub(cost);
    }

    if(loopOver) bulkBuySPMult();
}

export function calcSpacetimePointsPerMinute(){
    const SPPerMin = calcSpacetimePointsGain().div(player.records.timeInCurrentSpacetime).mul(60);
    if(SPPerMin.gte(player.peakSPPerMin)){
        player.peakSPPerMin = SPPerMin;
        player.SPAtPeakSPPerMin = calcSpacetimePointsGain();
    };
    return SPPerMin;
}

export function calcSpacetimePointsGain(){
    if(!canSpacetime()) return new Decimal(0);
    let baseGain = player.spacetimeTore ? 
        new Decimal(10).pow(player.points.log(10).div(308).sub(1)) :
        new Decimal(1);
    baseGain = baseGain.mul(quantumUpgrades[1].effect);
    return baseGain.mul(spacetimePointMultiplier.effect).floor();
}

export function spacetimePrestige(){
    if(dimensions[7].boughtAmount <= 1) achievements[17].unlock();
    if(calcSpacetimePointsPerMinute().gt(player.records.highestSPPerMin)){
        player.records.highestSPPerMin = calcSpacetimePointsPerMinute();
    }
    player.spacetimePoints = player.spacetimePoints.add(calcSpacetimePointsGain());
    player.records.totalSpacetimeAmount += 1;
    player.records.spacetimeAmount += 1;
    if(player.records.timeInCurrentSpacetime < player.records.fastestSpacetime){
        player.records.fastestSpacetime = player.records.timeInCurrentSpacetime;
    }
    if(player.currentChallenge > 0) spacetimeChallenges[player.currentChallenge-1].complete();
    spacetimeReset();
}

const upgradeDescriptions = [
    "You gain more points based on time played",
    "Increase the base point upgrade multiplier (2x -> 2.2x)",
    "Point multiplier based on dimensional power",
    "All dimensions are more powerful based on unspent spacetime points",
    "Gain free point upgrades based on times spacetimed",
    "Passively gain spacetime points 10 times slower than your fastest spacetime",
    "Gain more DP based on time spent in current spacetime",
    "Start spacetimes with dimensional points based on unspent spacetime points"
];

const upgradeEffects = [
    new Effect(() => new Decimal(player.records.timePlayed / 100)
        .pow(0.75).add(1), "mult"),
    null,
    new Effect(() => 
        Decimal.min(Decimal.min(Decimal.min(player.dimensionalPower.pow(0.3), new Decimal(1e6)).mul(
        player.dimensionalPower.pow(0.2)).add(1), "1e10000").mul(
            player.dimensionalPower.div("1e10000").pow(0.025).add(1)
        ), "1e25000"), "mult"
    ),
    new Effect(() => 
        Decimal.min(player.spacetimePoints.mul(4).add(1).pow(1/3), "1e1000"), "mult"
    ),
    new Effect(() =>
        Decimal.min(Decimal.log2(player.records.spacetimeAmount+1).mul(3), new Decimal(25)), "add"
    ),
    null,
    new Effect(() => 
        new Decimal((player.records.timeInCurrentSpacetime / 10)**2+1), "mult"
    ),
    new Effect(() => Decimal.min(
        new Decimal(1e24), new Decimal(10).pow(player.spacetimePoints.add(20).pow(0.5))
    ), "add")
]

const upgradeCosts = [
    new Decimal(1),
    new Decimal(1),
    new Decimal(1),
    new Decimal(2),
    new Decimal(5),
    new Decimal(10),
    new Decimal(25),
    new Decimal(50)
];

export const spacetimeUpgrades = (function(){
    const upgrades = [];
    for(const i in upgradeDescriptions){
        upgrades.push(new Purchasable(
            false, () => player.spacetimeUpgrades[i], 
            (val) => {player.spacetimeUpgrades[i] = val},
            () => upgradeCosts[i], (cost) => player.spacetimePoints.gte(cost),
            upgradeEffects[i],
            (cost) => {player.spacetimePoints = player.spacetimePoints.sub(cost);},
            null, upgradeDescriptions[i])
        );
    }
    return upgrades;
})();

export const spacetimePointMultiplier = new Purchasable(
    true, () => player.spacetimePointMultipliers, 
    (boughtAmount) => { player.spacetimePointMultipliers = boughtAmount; },
    function(boughtAmount){
        if(boughtAmount >= calcSPMultThreesold()){
            return new Decimal(1000).pow(boughtAmount-calcSPMultThreesold()).mul(calcSPMultCostIncreaseThreesold());
        }
        return new Decimal(25).pow(boughtAmount).mul(10);
    },
    (cost) => player.spacetimePoints.gte(cost),
    new Effect((boughtAmount) => new Decimal(3).pow(boughtAmount), "mult"),
    (cost) => { player.spacetimePoints = player.spacetimePoints.sub(cost); },
    null, "Triple spacetime point gain"
);

function calcSPMultThreesold(){
    return Math.ceil(calcSPMultCostIncreaseThreesold().div(10).log(25).toNumber());
}

const milestoneGoals = [
    1,
    2,
    5,
    10,
    15,
    20,
    30,
    50
]

const milestoneRewards = [
    "Unlock point upgrade autobuyer",
    "You start every dimensional and spacetime with automation points unlocked and 100 AP",
    "You automatically get 10% of AP you would normally gain by sacrificing your CP per second",
    "You automatically get 10% of CP you would normally gain by compressing your points per second",
    "Unlock autobuyers for dimensions 1-4",
    "Unlock autobuyers for dimensions 5-8",
    "Unlock automatic dimensional",
    "Unlock automatic spacetime"
]

export const spacetimeMilestones = (function(){
    const milestones = [];
    for(const i in milestoneGoals){
        milestones.push(new Milestone(
            () => player.records.spacetimeAmount >= milestoneGoals[i], 
            `Collapse the spacetime ${milestoneGoals[i]} time${milestoneGoals[i] == 1 ? '' : 's'}`,
            milestoneRewards[i]
        ));
    }
    return milestones;
})();
