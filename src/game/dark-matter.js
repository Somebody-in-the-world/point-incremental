import Decimal from "break_eternity.js";
import { Purchasable } from "./purchasable";
import { Effect } from "./effect";
import { tearSpacetimeUpgrades } from "./tear-spacetime";
import { spacetimeChallenges } from "./spacetime-challenges";
import { calcWeakForceBoost } from "./atomic";
import { atomicChallenges } from "./atomic-challenges";
import { calcTimeSpeed } from "./time";

export const darkMatterUnlockRequirements = [
    new Decimal("1e2500"),
    new Decimal("1e9500"),
    new Decimal("1e16800"),
    new Decimal("1e30000"),
    new Decimal("1e100000"),
    new Decimal("1e150000")
];

export function calcDarkMatterBoostExponent(){
    let baseExponent = 120 + calcWeakForceBoost().toNumber();
    if(atomicChallenges[8].completed){
        baseExponent += atomicChallenges[8].effect.toNumber();
    }
    if(atomicChallenges[8].isRunning) baseExponent = baseExponent**0.5;
    return baseExponent;
}

export function calcDarkMatterBoost(){
    return player.darkMatter.add(1).pow(calcDarkMatterBoostExponent());
}

export function calcDarkMatterGain(){
    return darkGenerators[0].effect;
}

export function darkMatterGainTick(deltaTime){
    if(atomicChallenges[2].isRunning) return;
    player.darkMatter = player.darkMatter.add(calcDarkMatterGain()
        .mul(deltaTime).mul(calcTimeSpeed()));
}

const darkGeneratorBaseCosts = [
    new Decimal(1e12),
    new Decimal(1e45),
    new Decimal(1e80),
    new Decimal(1e150),
    new Decimal("1e500"),
    new Decimal("1e750")
];

const darkGeneratorCostMultipliers = [
    new Decimal(1e6),
    new Decimal(1e8),
    new Decimal(1e10),
    new Decimal(1e15),
    new Decimal(1e25),
    new Decimal(1e50)
];

const darkGeneratorMultiplierPerPurchases = [
    new Decimal(15),
    new Decimal(10),
    new Decimal(8),
    new Decimal(5),
    new Decimal(3),
    new Decimal(2)
];

export function bulkBuyDarkGenerator(idx){
    if(player.spacetimePoints.lt(1)) return;
    const amount = Math.floor(Math.max(player.spacetimePoints.div(darkGenerators[idx].cost)
        .log(darkGeneratorCostMultipliers[idx]).add(1).toNumber(), 0));

    if(amount <= 0) return;

    darkGenerators[idx].boughtAmount += amount;
    const cost = darkGenerators[idx].formula(darkGenerators[idx].boughtAmount-1);

    if(player.spacetimePoints.gte(cost)){
        player.spacetimePoints = player.spacetimePoints.sub(cost);
    }
}

export const darkGenerators = (function(){
    const generators = [];
    for(const idx in darkGeneratorBaseCosts){
        generators.push(new Purchasable(
            true, () => player.darkGenerators[idx], 
            (val) => {player.darkGenerators[idx] = val;},
            function(boughtAmount){
                let baseCost = darkGeneratorBaseCosts[idx]
                    .mul(darkGeneratorCostMultipliers[idx].pow(boughtAmount));
                return baseCost;
            },
            (cost) => player.spacetimePoints.gte(cost), 
            new Effect(function(boughtAmount){
                let effect = darkGeneratorMultiplierPerPurchases[idx]
                    .pow(Math.min(boughtAmount, 100000)+Math.max(boughtAmount-100000, 0)*0.5);
                if(idx != (darkGeneratorBaseCosts.length-1)){
                    effect = effect.mul(darkGenerators[Number(idx)+1].effect);
                }
                if(idx == 0){
                    effect = effect.mul(Math.min(boughtAmount, 10));
                    if(tearSpacetimeUpgrades[10].boughtAmount){
                        effect = effect.mul(tearSpacetimeUpgrades[10].effect);
                    }
                    if(achievements[29].unlocked){
                        effect = effect.mul(2);
                    }
                    if(spacetimeChallenges[5].completed){
                        effect = effect.mul(spacetimeChallenges[5].effect);
                    }
                }
                if(boughtAmount > 0){
                    if(tearSpacetimeUpgrades[11].boughtAmount){
                        effect = effect.mul(tearSpacetimeUpgrades[11].effect);
                    }
                    if(atomicChallenges[2].completed){
                        effect = effect.mul(atomicChallenges[2].effect);
                    }
                }
                return effect;
            }, "mult"),
            (cost) => {player.spacetimePoints = player.spacetimePoints.sub(cost);}
        ));
    }
    return generators;
})();
