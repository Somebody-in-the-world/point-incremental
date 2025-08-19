import { dimensions } from "./dimensional";
import { spacetimeMilestones, spacetimeUpgrades } from "./spacetime";

export function pointCompressionReset(){
    player.points = new Decimal(0);
    player.pointUpgrade.boughtAmount = 0;
}

export function dimensionalReset(){
    pointCompressionReset();
    player.compressedPoints = new Decimal(0);
    player.automationPoints = 
        spacetimeMilestones[1].unlocked ? new Decimal(100) : new Decimal(0);
    player.automationPointsUnlocked = 
        spacetimeMilestones[1].unlocked;
    player.dimensionalPower = new Decimal(0);
    player.antiPoints = new Decimal(1);
    for(let i = 0; i < 8; i++){
        dimensions[i].generatedAmount = new Decimal(0); 
    }
}

export function spacetimeReset(){
    dimensionalReset();
    player.dimensionalPoints = new Decimal(0);
    player.records.timeInCurrentSpacetime = 0;
    player.peakSPPerMin = new Decimal(0);
    player.currentChallenge = 0;
    if(spacetimeUpgrades[7].boughtAmount) player.dimensionalPoints = spacetimeUpgrades[7].effect;
    for(let i = 0; i < 8; i++){
        dimensions[i].boughtAmount = 0;
    }
}
