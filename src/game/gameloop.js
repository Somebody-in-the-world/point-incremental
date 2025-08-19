import { automaticPointGainTick, automaticAPGainTick } from "./automation-points";
import { automaticCPGainTick } from "./compressed-points";
import { automaticDPGainTick, dimensionalPowerGainTick } from "./dimensional";
import { calcSingleEffect } from "./point-upgrade";
import { canSpacetime, passiveGenerateSP, spacetimeMilestones, spacetimeUpgrades } from "./spacetime";
import { tabUnlocked } from "./tabs";
import { runAutobuyers } from "./autobuyers";
import { challenges, unlockPointReq } from "./challenges";
import { darkMatterGainTick } from "./dark-matter";

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

    if(player.automationPoints.gte(1e3)) achievements[4].unlock();
    if(player.points.gte(1e10)) achievements[5].unlock();
    if(player.points.gte(1e30)) achievements[7].unlock();
    if(player.points.gte(1e100)) achievements[14].unlock();
    if(player.pointUpgrade.boughtAmount >= 40) achievements[6].unlock();
    if(player.pointUpgrade.boughtAmount >= 100) achievements[13].unlock();
    if(player.dimensions.bought[0] > 0) achievements[9].unlock();
    if(player.dimensions.bought[1] > 0) achievements[10].unlock();
    if(player.dimensionalPower.gte(1e6)) achievements[11].unlock();
    if(player.points.gte(1e30) && player.pointUpgrade.boughtAmount == 0) achievements[12].unlock();
    if(calcSingleEffect().gte(3)) achievements[15].unlock();
    if(player.records.fastestSpacetime <= 180) achievements[19].unlock();
    if(player.records.fastestSpacetime <= 20) achievements[22].unlock();
    if(spacetimeMilestones[7].unlocked) achievements[20].unlock();
    if((function(){
        for(let i = 0; i < 8; i++){
            if(!spacetimeUpgrades[i].boughtAmount) return false;
        }
        return true;
    })()) achievements[21].unlock();
    if(player.spacetimePoints.gte(1e3)) achievements[23].unlock();
    
    // Tabs
    tabUnlocked[1] = spacetimeMilestones[0].unlocked;
    tabUnlocked[2] = challenges[0].unlocked;
    tabUnlocked[3] = player.automationPointsUnlocked || player.records.dimensionalAmount > 0;
    tabUnlocked[4] = player.records.spacetimeAmount > 0;
    tabUnlocked[5] = player.darkGeneratorsUnlocked > 0;

    if(player.points.gte(unlockPointReq[player.latestUnlockedChallenge])){
        challenges[player.latestUnlockedChallenge].unlock();
    }

    Events.UI.dispatch(GAME_EVENTS.GAME_TICK);
    player.records.timePlayed += player.settings.updateRate / 1000;
    player.records.timeInCurrentSpacetime += player.settings.updateRate / 1000;
}
