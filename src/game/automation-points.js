import { spacetimeChallenges } from "./spacetime-challenges";
import { calcPointGain } from "./points";
import { Purchasable } from "./purchasable";
import { spacetimeMilestones } from "./spacetime";
import { atomicChallenges } from "./atomic-challenges";

export const automationPointsUnlock = new Purchasable(false, 
    () => player.automationPointsUnlocked,
    (val) => {player.automationPointsUnlocked = val;},
    () => new Decimal(100),
    (cost) => player.compressedPoints.gte(cost),
    null,
    null
);

export function calcAutomaticPointGainPercent(){
    if(spacetimeChallenges[0].isRunning || atomicChallenges[3].isRunning) return new Decimal(1);
    let power = 0.6;
    if(spacetimeChallenges[0].completed) power += 0.1;
    let baseEffect = player.automationPoints.pow(power).div(4);
    return baseEffect;
};

export function automaticPointGainTick(deltaTime){
    player.points = player.points.add(calcPointGain().mul(
        calcAutomaticPointGainPercent()).mul(deltaTime));
};

export function automationPointsSacrifice(){
    player.automationPoints = player.automationPoints.add(player.compressedPoints);
    player.compressedPoints = new Decimal(0);
}

export function automaticAPGainTick(deltaTime){
    if(spacetimeMilestones[2].unlocked){
        player.automationPoints = player.automationPoints.add(
            player.compressedPoints.div(10).mul(deltaTime)
        );
    }
}
