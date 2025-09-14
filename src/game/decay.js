import { Purchasable } from "./purchasable";
import { Effect } from "./effect";
import Decimal from "break_eternity.js";
import { atomicChallenges } from "./atomic-challenges";

export function calcDecayEnergyGain(){
    let baseGain = Decimal.max(player.protons.sub(1e20), 0).add(
        Decimal.max(player.neutrons.sub(1e20), 0)).add(
            Decimal.max(player.electrons.sub(1e20), 0)
        ).div(1e20).pow(0.35);
    if(baseGain.gte(1e33)) baseGain = baseGain.div(1e33).pow(0.35).mul(1e33);
    baseGain = baseGain.mul(decayEnergyUpgrades[3].effect).mul(atomicChallenges[6].effect);
    if(achievements[48].unlocked) baseGain = baseGain.mul(3);
    return baseGain;
}

export function calcDecaySpeedBase(){
    return new Decimal(2).pow(new Decimal(1).div(decayEnergyUpgrades[2].effect));
}

export function calcDecaySpeed(){
    return calcDecaySpeedBase().pow(1 / 60);
}

export function particleDecayTick(deltaTime){
    if(player.protons.gte(1e20)){
        player.protons = player.protons.sub(1e20).div(calcDecaySpeed().pow(deltaTime)).add(1e20)
    }
    if(player.neutrons.gte(1e20)){
        player.neutrons = player.neutrons.sub(1e20).div(calcDecaySpeed().pow(deltaTime)).add(1e20)
    }
    if(player.electrons.gte(1e20)){
        player.electrons = player.electrons.sub(1e20).div(calcDecaySpeed().pow(deltaTime)).add(1e20)
    }
    player.decayEnergy = player.decayEnergy.add(calcDecayEnergyGain().mul(deltaTime));
}

const upgradeCosts = [
    (boughtAmount) => new Decimal(100).pow(boughtAmount).mul(10),
    (boughtAmount) => new Decimal(100).pow(boughtAmount).mul(100),
    (boughtAmount) => new Decimal(1e3).pow(boughtAmount).mul(1e3),
    (boughtAmount) => new Decimal(1e3).pow(boughtAmount).mul(1e3)
];

const upgradeEffects = [
    new Effect((boughtAmount) => new Decimal(2).pow(boughtAmount), "mult"),
    new Effect((boughtAmount) => new Decimal(3).pow(boughtAmount), "mult"),
    new Effect((boughtAmount) => new Decimal((boughtAmount+1)**1.5), "mult"),
    new Effect((boughtAmount) => new Decimal(5).pow(boughtAmount), "mult")
];

const upgradeDescriptions = [
    "Double quantum foam gain",
    "Triple particle gain",
    "Protons, neutrons, and electrons decay slower (doesn't affect decay energy gain)",
    "Quintuple decay energy gain"
];

export const decayEnergyUpgrades = (function(){
    const upgrades = [];
    for(const i in upgradeCosts){
        upgrades.push(new Purchasable(
            true, () => player.decayEnergyUpgrades[i], 
            (boughtAmount) => { player.decayEnergyUpgrades[i] = boughtAmount; }, upgradeCosts[i],
            (cost) => player.decayEnergy.gte(cost), upgradeEffects[i],
            (cost) => { player.decayEnergy = player.decayEnergy.sub(cost); }, null,
            upgradeDescriptions[i]
        ));
    }
    return upgrades;
})();

