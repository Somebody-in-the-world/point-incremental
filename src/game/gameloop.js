import { automaticPointGainTick, automaticAPGainTick } from "./automation-points";
import { automaticCPGainTick } from "./compressed-points";
import { automaticDPGainTick, dimensionalPowerGainTick } from "./dimensional";
import { canSpacetime, passiveGenerateSP } from "./spacetime";
import { runAutobuyers } from "./autobuyers";
import { spacetimeChallenges } from "./spacetime-challenges";
import { darkMatterGainTick } from "./dark-matter";
import { unlockAchivements } from "./achievements";
import { forceGainTick } from "./atomic";
import { quantumFoamGainTick } from "./quantum";
import { particleDecayTick } from "./decay";

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

    if(spacetimeChallenges[5].isRunning){
        player.antiPoints = player.antiPoints.mul(new Decimal(1e300).pow(deltaTime));
    }

    automaticCPGainTick(deltaTime);
    automaticAPGainTick(deltaTime);
    dimensionalPowerGainTick(deltaTime);
    automaticDPGainTick(deltaTime);
    darkMatterGainTick(deltaTime);
    forceGainTick(deltaTime);
    quantumFoamGainTick(deltaTime);
    particleDecayTick(deltaTime);

    runAutobuyers();

    passiveGenerateSP(deltaTime);

    // Achievements stuff
    unlockAchivements();

    if(player.latestUnlockedChallenge != spacetimeChallenges.length){
        if(spacetimeChallenges[player.latestUnlockedChallenge].canUnlock){
            spacetimeChallenges[player.latestUnlockedChallenge].unlock();
        }
    }

    player.records.timePlayed += deltaTime;
    player.records.timeInCurrentSpacetime += deltaTime;
    player.records.timeInCurrentAtomic += deltaTime;

    lastTick = now;
    requestAnimationFrame(gameLoop);
}
