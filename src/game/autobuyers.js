import { Autobuyer } from "./autobuyer";
import { dimensions, dimensionalPointsPrestige, calcDimensionalPointsGain, calcDimensionalReq, bulkBuyDimension } from "./dimensional";
import { spacetimePrestige, canSpacetime, calcSpacetimePointsGain } from "./spacetime";
import { pointUpgrade, bulkBuyPointUpgrades } from "./point-upgrade";
import { spacetimeMilestones, bulkBuySPMult } from "./spacetime";
import { tearSpacetimeUpgrades } from "./tear-spacetime";
import { bulkBuyDarkGenerator } from "./dark-matter";
import { atomicMilestones, atomicPrestige, calcParticleGain, canAtomic } from "./atomic";

export function runAutobuyers(){
    if(autobuyers[0].unlocked && autobuyers[0].active){
        if(calcParticleGain().gte(autobuyers[0].input) && canAtomic()){
            atomicPrestige();
        }
    }
    if(autobuyers[1].unlocked && autobuyers[1].active && canSpacetime()){
        if(player.spacetimeTore){
            if(autobuyers[1].mode == 0 && calcSpacetimePointsGain().gte(autobuyers[1].input)){
                spacetimePrestige();
            }
            if(autobuyers[1].mode == 1 && calcSpacetimePointsGain().gte(player.spacetimePoints.mul(autobuyers[1].input))){
                spacetimePrestige();
            }
            if(autobuyers[1].mode == 2 && player.records.timeInCurrentSpacetime >= Number(autobuyers[1].input)){
                spacetimePrestige();
            }
        } else {
            spacetimePrestige();
        }
    }
    if(autobuyers[2].unlocked && autobuyers[2].active){
        if(calcDimensionalPointsGain().div(player.dimensionalPoints.add(1)).gte(autobuyers[2].input)
            && player.points.gte(calcDimensionalReq())){
            dimensionalPointsPrestige();
        }
    }
    if(autobuyers[3].unlocked && autobuyers[3].active){
        if(achievements[22].unlocked){
            bulkBuyPointUpgrades();
        } else {
            if(pointUpgrade.canBuy) pointUpgrade.buy();
        }
    }
    let dim = 0;
    for(let i = 4; i < 12; i++){
        if(autobuyers[i].unlocked && autobuyers[i].active && dimensions[dim].canBuy){
            if(tearSpacetimeUpgrades[9].boughtAmount){
                bulkBuyDimension(dim);
            } else {
                dimensions[dim].buy();
            }
        }
        dim++;
    }
    if(autobuyers[12].unlocked && autobuyers[12].active){
        bulkBuySPMult();
    }
    let generator = 0;
    for(let i = 13; i < 19; i++){
        if(autobuyers[i].unlocked && autobuyers[i].active && 
            generator < player.darkGeneratorsUnlocked){
            bulkBuyDarkGenerator(generator);
        }
        generator++;
    }
}

const autobuyerNames = [
    "Automatic Atomic",
    "Automatic Spacetime",
    "Automatic Dimensional",
    "Point upgrade autobuyer",
    "1st dimension autobuyer",
    "2nd dimension autobuyer",
    "3rd dimension autobuyer",
    "4th dimension autobuyer",
    "5th dimension autobuyer",
    "6th dimension autobuyer",
    "7th dimension autobuyer",
    "8th dimension autobuyer",
    "SP multiplier autobuyer",
    "1st dark generator autobuyer",
    "2nd dark generator autobuyer",
    "3rd dark generator autobuyer",
    "4th dark generator autobuyer",
    "5th dark generator autobuyer",
    "6th dark generator autobuyer"
];

const autobuyerModes = [
    [
        {
            text: "Atomic at X particles: ",
            inputShowReq: () => true
        }
    ],
    [
        {
            text: "Spacetime at X SP: ",
            inputShowReq: () => player.spacetimeTore
        }, 
        {
            text: "X times current SP: ",
            inputShowReq: () => atomicMilestones[4].unlocked
        },
        {
            text: "Seconds since last spacetime:",
            inputShowReq: () => atomicMilestones[4].unlocked
        }
    ],
    [
        {
            text: "X times current DP: ",
            inputShowReq: () => true
        }
    ],
    null, null, null, null, null,
    null, null, null, null, null,
    null, null, null, null, null, null
];

const autobuyerUnlockReq = [
    () => atomicMilestones[9].unlocked,
    () => spacetimeMilestones[7].unlocked,
    () => spacetimeMilestones[6].unlocked,
    () => spacetimeMilestones[0].unlocked,
    () => spacetimeMilestones[4].unlocked,
    () => spacetimeMilestones[4].unlocked,
    () => spacetimeMilestones[4].unlocked,
    () => spacetimeMilestones[4].unlocked,
    () => spacetimeMilestones[5].unlocked,
    () => spacetimeMilestones[5].unlocked,
    () => spacetimeMilestones[5].unlocked,
    () => spacetimeMilestones[5].unlocked,
    () => atomicMilestones[0].unlocked,
    () => atomicMilestones[6].unlocked,
    () => atomicMilestones[6].unlocked,
    () => atomicMilestones[6].unlocked,
    () => atomicMilestones[7].unlocked,
    () => atomicMilestones[7].unlocked,
    () => atomicMilestones[7].unlocked
];

export function fixAutobuyers(){
    for(const i in autobuyers){
        if(!player.autobuyers[i].mode){
            player.autobuyers[i].mode = 0;
        }
        if(!autobuyers[i].hasInput){
            autobuyers[i].input = "";
        }
    }
}

export const autobuyers = (function(){
    const autobuyers = [];
    for(const i in autobuyerNames){
        autobuyers.push(new Autobuyer(
            autobuyerNames[i], autobuyerUnlockReq[i],
            () => player.autobuyers[i].active, 
            (isActive) => { player.autobuyers[i].active = isActive; },
            autobuyerModes[i] ? true : false, autobuyerModes[i],
            () => player.autobuyers[i].input,
            (input) => { player.autobuyers[i].input = input; },
            () => player.autobuyers[i].mode,
            (mode) => { player.autobuyers[i].mode = mode; },
        ));
    }
    return autobuyers;
})();
