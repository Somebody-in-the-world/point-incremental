import { Autobuyer } from "./autobuyer";
import { dimensions, dimensionalPointsPrestige, calcDimensionalPointsGain, calcDimensionalReq, bulkBuyDimension } from "./dimensional";
import { spacetimePrestige, canSpacetime, calcSpacetimePointsGain } from "./spacetime";
import { pointUpgrade, calcMaxPointUpgradesAffordable } from "./point-upgrade";
import { spacetimeMilestones } from "./spacetime";
import {tearSpacetimeUpgrades} from "./tear-spacetime";

export function runAutobuyers(){
    if(autobuyers[0].unlocked && autobuyers[0].active){
        if(canSpacetime() && calcSpacetimePointsGain().gte(autobuyers[0].textBoxInput)){
            spacetimePrestige();
        }
    }
    if(autobuyers[1].unlocked && autobuyers[1].active){
        if(calcDimensionalPointsGain().div(player.dimensionalPoints.add(1)).gte(autobuyers[1].textBoxInput) && player.points.gte(calcDimensionalReq())){
            dimensionalPointsPrestige();
        }
    }
    if(autobuyers[2].unlocked && autobuyers[2].active){
        if(achievements[22].unlocked){
            let maxAffordable = calcMaxPointUpgradesAffordable();
            pointUpgrade.boughtAmount += maxAffordable.amount;
            if(player.points.gte(maxAffordable.totalCost)){
                player.points = player.points.sub(maxAffordable.totalCost);
            }
        } else {
            if(pointUpgrade.canBuy) pointUpgrade.buy();
        }
    }
    for(let i = 3; i < 11; i++){
        if(autobuyers[i].unlocked && autobuyers[i].active && dimensions[i-3].canBuy){
            if(tearSpacetimeUpgrades[9].boughtAmount){
                bulkBuyDimension(i-3);
            } else {
                dimensions[i-3].buy();
            }
        }    
    }
}

const autobuyerNames = [
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
    "8th dimension autobuyer"
];

const autobuyerExtra = [
    {text: "Spacetime at X SP:", textbox: true,
        inputGetter: () => player.autobuyers[0].input,
        inputSetter: (input) => {player.autobuyers[0].input = input},
        inputShowReq: () => player.spacetimeTore
    },
    {text: "X times current DP:", textbox: true, 
        inputGetter: () => player.autobuyers[1].input,
        inputSetter: (input) => {player.autobuyers[1].input = input},
        inputShowReq: () => true
    },
    {text: "", textbox: false},
    {text: "", textbox: false}, 
    {text: "", textbox: false},
    {text: "", textbox: false}, 
    {text: "", textbox: false},
    {text: "", textbox: false}, 
    {text: "", textbox: false},
    {text: "", textbox: false}, 
    {text: "", textbox: false}
];

const autobuyerUnlockReq = [
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
    () => spacetimeMilestones[5].unlocked
];

export const autobuyers = (function(){
    const autobuyers = [];
    for(const i in autobuyerNames){
        autobuyers.push(new Autobuyer(
            autobuyerNames[i], autobuyerUnlockReq[i],
            () => player.autobuyers[i].active, 
            (isActive) => { player.autobuyers[i].active = isActive; },
            autobuyerExtra[i]
        ));
    }
    return autobuyers;
})();
