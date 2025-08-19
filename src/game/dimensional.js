import { dimensionalReset } from "./resets";
import { Dimension } from "./dimension";
import Decimal from "break_eternity.js";
import { Effect } from "./effect";
import { spacetimeUpgrades } from "./spacetime";
import { tearSpacetimeUpgrades } from "./tear-spacetime";
import { challenges } from "./challenges";

export function calcDimensionalReq(){
    if(achievements[12].unlocked) return new Decimal(1e25);
    return new Decimal(1e30);
}

export function calcDimensionalPointsGain(){
    let DPGain = player.points.div(calcDimensionalReq()).pow(0.1);
    if(achievements[18].unlocked) DPGain = DPGain.mul(3);
    if(tearSpacetimeUpgrades[5].boughtAmount) DPGain = DPGain.mul(tearSpacetimeUpgrades[5].effect);
    return DPGain.floor();
}

export function calcNextDimensionalPoint(){
    return calcDimensionalPointsGain().add(1).pow(10).mul(calcDimensionalReq());
}

export function dimensionalPointsPrestige(){
    if(player.dimensionalPoints.gte(1e10) && 
        calcDimensionalPointsGain().div(player.dimensionalPoints).gte(1e10)){
        achievements[18].unlock();
    }
    player.dimensionalPoints = 
        player.dimensionalPoints.add(calcDimensionalPointsGain());
    dimensionalReset();
    player.records.dimensionalAmount++;
    achievements[8].unlock();
}

export const dimensionBaseCost = [
    new Decimal(1),
    new Decimal(10),
    new Decimal(1000),
    new Decimal(1e5),
    new Decimal(1e8),
    new Decimal(1e11),
    new Decimal(1e15),
    new Decimal(1e20)
];

export const dimensionCostMult = [
    new Decimal(10),
    new Decimal(10),
    new Decimal(100),
    new Decimal(100),
    new Decimal(1e3),
    new Decimal(1e3),
    new Decimal(1e4),
    new Decimal(1e5)
];

export function calcDimensionPerPurchaseMult(){
    let perPurchaseMult = new Decimal(2);
    if(challenges[3].completed) perPurchaseMult = perPurchaseMult.add(0.5);
    return perPurchaseMult;
}

export function dimensionalPowerGainTick(){
    if(player.currentChallenge == 4) return;
    for(let dim = 6; dim >= 0; dim--){
        player.dimensions.generated[dim] = player.dimensions.generated[dim].add(
            dimensions[dim+1].totalAmount.mul(dimensions[dim+1].effect).
            mul(player.settings.updateRate / 1000)
        );
    }
    player.dimensionalPower = player.dimensionalPower.add(
        calcDimensionalPowerGain().mul(player.settings.updateRate / 1000
    ));
}

export function calcDimensionalPowerGain(){
    return dimensions[0].effect.mul(dimensions[0].totalAmount);
}

export function bulkBuyDimension(idx){
    if(player.dimensionalPoints.lt(1)) return;
    const amount = Math.floor(Math.max(player.dimensionalPoints.div(dimensions[idx].cost)
        .log(dimensionCostMult[idx]).add(1).toNumber(), 0));
    dimensions[idx].boughtAmount += amount;
    const cost = dimensions[idx].formula(dimensions[idx].boughtAmount-1);

    if(player.dimensionalPoints.gte(cost)){
        player.dimensionalPoints = player.dimensionalPoints
            .sub(cost);
    }
}

export function calcDimensionalPowerBoost(){
    let baseBoost = player.dimensionalPower.add(1).log(10).div(30);
    if(tearSpacetimeUpgrades[7].boughtAmount){
        baseBoost = baseBoost.mul(tearSpacetimeUpgrades[7].effect);
    }
    return baseBoost;
}

export function calcChall2FreePointUpgrades(){
    return player.dimensionalPower.add(1).log(10).add(1).log(10).pow(4);
}

export function automaticDPGainTick(){
    if(tearSpacetimeUpgrades[8].boughtAmount){
        player.dimensionalPoints = player.dimensionalPoints.add(
            calcDimensionalPointsGain().div(100).mul(player.settings.updateRate / 1000)
        );
    }
}

export const dimensions = (function(){
    const dims = [];
    for(let idx = 0; idx < 8; idx++){
        dims.push(
            new Dimension(() => player.dimensions.bought[idx], 
                (val) => {player.dimensions.bought[idx] = val},
                function(boughtAmount){
                    return dimensionBaseCost[idx].mul(
                        dimensionCostMult[idx].pow(boughtAmount));
                }, 
                (cost) => player.dimensionalPoints.gte(cost),
                () => player.dimensions.generated[idx], 
                (val) => {player.dimensions.generated[idx] = val}, 
                new Effect(function(boughtAmount){
                    let mult = calcDimensionPerPurchaseMult().pow(boughtAmount);
                    if(idx == 0 && achievements[13].unlocked){
                        mult = mult.mul(player.pointUpgrade.boughtAmount / 100 + 1);
                    }
                    if(idx == 7 && achievements[17].unlocked){
                        mult = mult.mul(1.1);
                    }
                    if(spacetimeUpgrades[3].boughtAmount) mult = mult.mul(spacetimeUpgrades[3].effect);
                    
                    return mult;
                }, "mult"),
                (cost) => {player.dimensionalPoints = player.dimensionalPoints.sub(cost)}
            )
        );
    }
    return dims;
})();

