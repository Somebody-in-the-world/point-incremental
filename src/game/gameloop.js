import { automaticPointGainTick, automaticAPGainTick } from "./automation-points";
import { automaticCPGainTick } from "./compressed-points";
import { automaticDPGainTick, dimensionalPowerGainTick } from "./dimensional";
import { canSpacetime, passiveGenerateSP, spacetimeMilestones } from "./spacetime";
import { tabUnlocked } from "./tabs";
import { runAutobuyers } from "./autobuyers";
import { challenges, unlockPointReq } from "./challenges";
import { darkMatterGainTick } from "./dark-matter";
import { unlockAchivements } from "./achievements";
import { forceGainTick } from "./atomic";
import { quantumFoamGainTick } from "./quantum";

let lastTick = performance.now();

export function gameLoop(){
    const now = performance.now();
    let deltaTime = (now - lastTick) / 1000;

    if((!canSpacetime()) || player.spacetimeTore){
        automaticPointGainTick(deltaTime);
    }

    if(player.points.gte(player.records.highestPoints)){
        player.records.highestPoints = player.points;
    }
    if(player.points.gte(player.highestPointsThisCompression)){
        player.highestPointsThisCompression = player.points;
    }
    if(player.points.gte(player.highestPointsThisDimensional)){
        player.highestPointsThisDimensional = player.points;
    }

    if(player.currentChallenge == 6){
        player.antiPoints = player.antiPoints.mul(new Decimal(1e300).pow(deltaTime));
    }

    automaticCPGainTick(deltaTime);
    automaticAPGainTick(deltaTime);
    dimensionalPowerGainTick(deltaTime);
    automaticDPGainTick(deltaTime);
    darkMatterGainTick(deltaTime);
    forceGainTick(deltaTime);
    quantumFoamGainTick(deltaTime);

    runAutobuyers();

    passiveGenerateSP(deltaTime);

    // Achievements stuff
    unlockAchivements();
    
    // Tabs
    tabUnlocked[1] = spacetimeMilestones[0].unlocked || player.records.atomicAmount > 0;
    tabUnlocked[2] = challenges[0].unlocked || player.records.atomicAmount > 0;
    tabUnlocked[3] = player.automationPointsUnlocked || player.records.dimensionalAmount > 0;
    tabUnlocked[4] = player.records.totalSpacetimeAmount > 0;
    tabUnlocked[5] = player.darkGeneratorsUnlocked > 0 || player.records.atomicAmount > 0;
    tabUnlocked[6] = player.records.atomicAmount > 0;

    if(player.points.gte(unlockPointReq[player.latestUnlockedChallenge]) &&
        player.latestUnlockedChallenge != challenges.length){
        challenges[player.latestUnlockedChallenge].unlock();
    }

    player.records.timePlayed += deltaTime;
    player.records.timeInCurrentSpacetime += deltaTime;
    player.records.timeInCurrentAtomic += deltaTime;

    lastTick = now;
    requestAnimationFrame(gameLoop);
}
