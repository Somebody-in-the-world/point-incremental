import { calcSingleEffect, pointUpgrade } from "./point-upgrade";
import { dimensions } from "./dimensional";
import { spacetimeMilestones, spacetimeUpgrades } from "./spacetime";
import { calcTotalChallsCompleted, challenges } from "./challenges";
import { darkGenerators } from "./dark-matter";
import { atomicMilestones } from "./atomic";

export class Achievement {
    constructor(id, title, requirements, reward, 
        unlockGetter, unlockSetter, unlockReqFunc){
        this.id = id;
        this.title = title;
        this.requirements = requirements;
        this.reward = reward;
        this.unlockGetter = unlockGetter;
        this.unlockSetter = unlockSetter;
        this.unlockReqFunc = unlockReqFunc;
    }

    unlock(){
        this.unlocked = true;
    }

    get unlocked(){
        return this.unlockGetter();
    }

    set unlocked(val){
        this.unlockSetter(val);
    }

    get canUnlock(){
        return this.unlockReqFunc();
    }
}

export function unlockAchivements(){
    for(const ach of achievements){
        if((!ach.unlocked) && ach.unlockReqFunc){
            if(ach.canUnlock) ach.unlock();
        }
    }
}

export const achievementsTitle = [
    "You gotta start somewhere",
    "10 points is a lot",
    "Hydraulic press",
    "You gotta do some sacrifices",
    "I never liked clicking anyways",
    "Thats a lot of points",
    "Where is the M button???",
    "(softcapped)",
    "Raising it to a higher dimension",
    "Is that an antimatter dimensions reference???",
    "10 dimensional points is still a lot",
    "1 million is a lot",
    "You didn't even try",
    "GIVE ME THE M BUTTON!!!",
    "Googol",
    "Skipping the game",
    "Collapsing spacetime",
    "We only needed one",
    "ALL YOUR DP ARE BELONG TO US",
    "That's FAST!",
    "This mile took a spacetime",
    "I am rich",
    "Impossible, or is it?",
    "Collapser of spacetimes",
    "I'm free!",
    "This achievement exists",
    "Easy or Hard?",
    "A new beginning.",
    "NEW CHALLENGES???",
    "Anti-anti-anti-challenged",
    "Googol (spacetime points)",
    "We couldn't afford 9",
    "Zooming in",
    "Perfectly balanced",
    "Thats REALLY a lot of points",
    "Collapser of multiple spacetimes",
    "This mile took an atomic",
    "Zooming in DEEPER",
    "Physics breaker",
    "Zooming in EVEN DEEPER"
];

export const achievementsRequirements = [
    "Get a point",
    "Buy a point upgrade",
    "Compress your points",
    "Sacrifice your compressed points into automation points",
    "Get 1e3 automation points",
    "Get 1e10 points",
    "Buy 40 point upgrades",
    "Get 1e30 points",
    "Convert your points into dimensional points",
    "Buy the first dimension",
    "Buy the second dimension",
    "Get 1e6 dimensional power",
    "Get 1e30 points without having point upgrades",
    "Buy 100 point upgrades",
    "Get 1e100 points",
    "Have the point upgrade multiplier to be over 3x",
    "Collapse the spacetime",
    "Collapse spacetime with only one 8th dimension",
    "Dimensional for 1e10x higher DP than your current DP while having at least 1e10 DP",
    "Spacetime in under 3 minutes",
    "Get all spacetime milestones",
    "Buy all spacetime upgrades",
    "Spacetime in under 20 seconds",
    "Have 1000 spacetime points",
    "Tear spacetime",
    "Get 1e1000 points",
    "Complete a challenge",
    "Start generating dark matter",
    "Complete challenge 4",
    "Complete all challenges",
    "Get 1e100 spacetime points",
    "Buy a tier 6 dark generator",
    "Go atomic",
    "Have one of each particle type",
    "Get 1e1000000 points",
    "Get 1e10000 spacetime points",
    "Get all atomic milestones",
    "Enter the quantum",
    "Get 1e10 particles",
    "Enter the quantum at depth 2"
];

export const achievementReqFuncs = [
    () => player.points.gt(0),
    () => pointUpgrade.boughtAmount > 0,
    () => player.compressedPoints.gt(0),
    () => player.automationPoints.gt(0),
    () => player.automationPoints.gte(1e3),
    () => player.points.gte(1e10),
    () => pointUpgrade.boughtAmount >= 40,
    () => player.points.gte(1e30),
    () => player.records.dimensionalAmount > 0,
    () => dimensions[0].boughtAmount > 0,
    () => dimensions[1].boughtAmount > 0,
    () => player.dimensionalPower.gte(1e6),
    () => pointUpgrade.boughtAmount == 0 && player.points.gte(1e30),
    () => pointUpgrade.boughtAmount >= 100,
    () => player.points.gte(1e100),
    () => calcSingleEffect().gte(3),
    () => player.records.spacetimeAmount > 0,
    null, null,
    () => player.records.fastestSpacetime < 180,
    () => spacetimeMilestones[7].unlocked,
    function(){
        for(let i = 0; i < 8; i++){
            if(!spacetimeUpgrades[i].boughtAmount) return false;
        }
        return true;
    },
    () => player.records.fastestSpacetime < 20,
    () => player.spacetimePoints.gte(1000),
    () => player.spacetimeTore,
    () => player.points.gte("1e1000"),
    () => calcTotalChallsCompleted() > 0,
    () => darkGenerators[0].boughtAmount > 0,
    () => challenges[3].completed,
    () => calcTotalChallsCompleted() == challenges.length,
    () => player.spacetimePoints.gte(1e100),
    () => darkGenerators[5].boughtAmount > 0,
    () => player.records.atomicAmount > 0,
    () => player.protons.gt(0) && player.neutrons.gt(0) && player.electrons.gt(0),
    () => player.points.gte("1e1e6"),
    () => player.spacetimePoints.gte("1e10000"),
    () => atomicMilestones[9].unlocked,
    () => player.quantumDepth > 0,
    () => player.particles.gte(1e10),
    () => player.quantumDepth >= 2
];

export const achievementsRewards = [
    null, null, null, null, null, null,
    "Unlock max all for point upgrades",
    null,
    "Gain 10x more points",
    null, null, null,
    "Reduce the dimensional requirement to 1e25 points",
    "First dimension is boosted based on your point upgrades",
    null, null, null,
    "8th dimensions are 10% more powerful",
    "Gain 3x more DP",
    null, null, null,
    "The point upgrade autobuyer bulk buys upgrades",
    null, null, null, null, null, null,
    "Gain 2x more dark matter",
    "Gain 1e100x more points",
    null, null, 
    "You can distribute all particles",
    null, null, null, null, null, null
];

export const achievements = (function(){
    const ach = [];
    for(const id in achievementsTitle){
        ach.push(new Achievement(
            id, achievementsTitle[id], achievementsRequirements[id], 
            achievementsRewards[id], () => player.achievements[id],
            (val) => {player.achievements[id] = val;}, achievementReqFuncs[id]
        ));
    }
    return ach;
})();
