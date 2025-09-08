import { atomicMilestones } from "./atomic";
import { atomicChallenges } from "./atomic-challenges";
import { darkGenerators } from "./dark-matter";
import { dimensions } from "./dimensional";
import { spacetimeMilestones, spacetimeUpgrades } from "./spacetime";
import { tearSpacetimeUpgrades } from "./tear-spacetime";

export function pointCompressionReset(){
    player.points = new Decimal(0);
    player.pointUpgrade.boughtAmount = 0;
    player.highestPointsThisCompression = new Decimal(0);
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
    player.highestPointsThisDimensional = new Decimal(0);
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

export function atomicReset(){
    if(player.currentAtomicChallenge > 0){
        player.quarks += atomicChallenges[player.currentAtomicChallenge-1].cost;
    }
    player.currentAtomicChallenge = 0;
    player.quantumDepth = 0;
    player.peakParticlesPerMin = new Decimal(0);
    player.records.timeInCurrentAtomic = 0;
    player.spacetimePoints = new Decimal(0);
    player.currentChallenge = 0;
    player.darkMatter = new Decimal(0);
    player.records.spacetimeAmount = atomicMilestones[1].unlocked ? 50 : 0;
    player.spacetimePointMultipliers = 0;
    player.latestUnlockedChallenge = atomicMilestones[5].unlocked ? 6 : 0;
    player.darkGeneratorsUnlocked = atomicMilestones[8].unlocked ? 6 : 0;
    player.records.highestSPPerMin = new Decimal(0);
    player.records.fastestSpacetime = 99999999;
    player.spacetimeTore = atomicMilestones[1].unlocked;
    player.electromagneticForce = new Decimal(0);
    player.strongForce = new Decimal(0);
    player.weakForce = new Decimal(0);
    for(const upgrade of spacetimeUpgrades){
        upgrade.boughtAmount = atomicMilestones[2].unlocked;
    }
    for(const upgrade of tearSpacetimeUpgrades){
        if(upgrade.repeatable){
            upgrade.boughtAmount = atomicMilestones[3].unlocked ? upgrade.cap : 0;
        } else {
            upgrade.boughtAmount = atomicMilestones[3].unlocked;
        }
    }
    for(let i = 0; i < 6; i++){
        darkGenerators[i].boughtAmount = 0;
        player.challengeCompletions[i] = atomicMilestones[5].unlocked;
    }
    spacetimeReset();
}

