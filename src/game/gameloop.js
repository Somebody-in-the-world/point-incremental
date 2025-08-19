import { automaticPointGainTick, automaticAPGainTick } from "./automation-points";
import { automaticCPGainTick } from "./compressed-points";
import { automaticDPGainTick, dimensionalPowerGainTick } from "./dimensional";
import { canSpacetime, passiveGenerateSP, spacetimeMilestones } from "./spacetime";
import { tabUnlocked } from "./tabs";
import { runAutobuyers } from "./autobuyers";
import { challenges, unlockPointReq } from "./challenges";
import { darkMatterGainTick } from "./dark-matter";
import { unlockAchivements } from "./achievements";

export function gameLoop(){
    if((!canSpacetime()) || player.spacetimeTore){
        automaticPointGainTick();
    }

    if(player.points.gte(player.records.highestPoints)){
        player.records.highestPoints = player.points;
    }

    if(player.currentChallenge == 6){
        player.antiPoints = player.antiPoints.mul(new Decimal(1e300)
            .pow(player.settings.updateRate / 1000));
    }

    automaticCPGainTick();
    automaticAPGainTick();
    dimensionalPowerGainTick();
    automaticDPGainTick();
    darkMatterGainTick();

    runAutobuyers();

    passiveGenerateSP();

    // Achievements stuff
    unlockAchivements();
    
    // Tabs
    tabUnlocked[1] = spacetimeMilestones[0].unlocked;
    tabUnlocked[2] = challenges[0].unlocked;
    tabUnlocked[3] = player.automationPointsUnlocked || player.records.dimensionalAmount > 0;
    tabUnlocked[4] = player.records.spacetimeAmount > 0;
    tabUnlocked[5] = player.darkGeneratorsUnlocked > 0;

    if(player.points.gte(unlockPointReq[player.latestUnlockedChallenge]) &&
        player.latestUnlockedChallenge != challenges.length){
        challenges[player.latestUnlockedChallenge].unlock();
    }

    Events.UI.dispatch(GAME_EVENTS.GAME_TICK);
    player.records.timePlayed += player.settings.updateRate / 1000;
    player.records.timeInCurrentSpacetime += player.settings.updateRate / 1000;
}
