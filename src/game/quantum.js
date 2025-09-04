import { atomicReset } from "./resets";
import { Purchasable } from "./purchasable";
import { calcGravitationalWaveBoost, calcParticleGain, canAtomic } from "./atomic";
import { Effect } from "./effect";
import Decimal from "break_eternity.js";

export const quantumUnlock = new Purchasable(
    false, () => player.quantumUnlocked, (val) => { player.quantumUnlocked = val; },
    () => new Decimal(1e6), (cost) => player.particles.gte(cost), null,
    (cost) => { player.particles = player.particles.sub(cost); }, null,
    "Unlock Quantum"
);

export const upgradeCosts = [
    1, 2, 5, 3, 8, 99999999
];

export const upgradeCaps = [
    40, 25, 15, 15, 10, 1
];

export const upgradeDescriptions = [
    "Gain more points based on quantum foam",
    "Gain more spacetime points based on quantum foam",
    "Gain more particles based on quantum foam",
    "Quadruple quantum foam gain",
    "Gain more gravity based on quantum foam",
    "Coming soon!"
];

export const upgradeUnlockReqs = [
    () => true, () => true, () => true, () => true,
    () => nonRepeatableQuantumUpgrades[2].boughtAmount,
    () => nonRepeatableQuantumUpgrades[2].boughtAmount
];

export const nonRepeatableUpgradeCosts = [
    new Decimal(5e6),
    new Decimal(2.5e7),
    new Decimal(1e9),
    new Decimal(2).pow(1024)
];

export const nonRepeatableUpgradeDescriptions = [
    "Unlock gravity",
    "Unlock gravitational waves",
    "Unlock more quantum upgrades",
    "Coming soon!"
];

export const nonRepeatableUpgradeDepthReqs = [
    2, 2, 3, 3
];

export const upgradeEffects = [
    new Effect((boughtAmount) => player.quantumFoam.add(1).pow(100*boughtAmount), "mult"),
    new Effect((boughtAmount) => player.quantumFoam.add(1).pow(4*boughtAmount), "mult"),
    new Effect((boughtAmount) => player.quantumFoam.add(1).pow(0.1*Math.min(boughtAmount, 4))
        .mul(player.quantumFoam.pow(0.033*Math.max(boughtAmount-4, 0))), "mult"),
    new Effect((boughtAmount) => new Decimal(4).pow(boughtAmount), "mult"),
    new Effect((boughtAmount) => player.quantumFoam.add(1).log(10).pow(0.4).div(2).add(1).pow(boughtAmount), "mult")
];

export const quantumUpgrades = (function(){
    const upgrades = [];
    for(const i in upgradeCosts){
        upgrades.push(new Purchasable(
            true, () => player.quantumUpgrades[i], 
            (boughtAmount) => { player.quantumUpgrades[i] = boughtAmount; },
            () => new Decimal(upgradeCosts[i]),
            (cost) => player.quarks >= cost.toNumber(), upgradeEffects[i],
            function(cost){ 
                player.quarks = player.quarks - cost.toNumber();
            }, upgradeCaps[i],
            upgradeDescriptions[i], upgradeUnlockReqs[i]
        ));
    }
    return upgrades;
})();

export const nonRepeatableQuantumUpgrades = (function(){
    const upgrades = [];
    for(const i in nonRepeatableUpgradeCosts){
        upgrades.push(new Purchasable(
            false, () => player.nonRepeatableQuantumUpgrades[i], 
            (boughtAmount) => { player.nonRepeatableQuantumUpgrades[i] = boughtAmount; },
            () => nonRepeatableUpgradeCosts[i], (cost) => player.quantumFoam.gte(cost), null,
            (cost) => { player.quantumFoam = player.quantumFoam.sub(cost); }, null,
            nonRepeatableUpgradeDescriptions[i], 
            () => calcMaxAvailQuantumDepth() >= nonRepeatableUpgradeDepthReqs[i]
        ));
    }
    return upgrades;
})();

export const quantumDepthUpgrade = new Purchasable(
    true, () => player.quantumDepthUpgrade, 
    (boughtAmount) => { player.quantumDepthUpgrade = boughtAmount; },
    (boughtAmount) => new Decimal(1e6).mul(new Decimal(10).pow(Math.max(boughtAmount-1, 0)).mul(1e3).pow(boughtAmount)),
    (cost) => player.quantumFoam.gte(cost), 
    new Effect((boughtAmount) => new Decimal(boughtAmount), "add"),
    (cost) => { player.quantumFoam = player.quantumFoam.sub(cost); },
    10, "Increase the maximum quantum depth"
);

export const quarkPurchasable = new Purchasable(
    true, () => player.totalQuarks, (boughtAmount) => { 
        player.quarks += boughtAmount - player.totalQuarks;
        player.totalQuarks = boughtAmount;
    },
    (boughtAmount) => new Decimal(100).mul(new Decimal(2).pow(boughtAmount)),
    (cost) => player.quantumFoam.gte(cost), null,
    (cost) => { player.quantumFoam = player.quantumFoam.sub(cost); }
);

export function respecUpgrades(){
    for(const upgrade of quantumUpgrades){
        upgrade.boughtAmount = 0;
    }
    player.quarks = player.totalQuarks;
    atomicReset();
}

export function calcQuantumNerf(depth){
    if(depth <= 0) return 1;
    return 1 / (1 + Math.min(2**(depth - 1), depth**2)**0.75 / 15);
}

export function enterQuantum(depth){
    atomicReset();
    player.quantumDepth = depth;
}

export function exitQuantum(){
    atomicReset();
}

export function calcMaxAvailQuantumDepth(){
    return 1 + quantumDepthUpgrade.effect.toNumber();
}

export function calcQuantumFoamGain(){
    if(!canAtomic()) return new Decimal(0);
    const baseGain = player.points.add(1).log(10).div(200000).mul(
        player.spacetimePoints.add(1).log(10).div(1000)).pow(2)
    .mul(calcParticleGain().add(1).log(10).add(1)).mul(
        new Decimal(player.quantumDepth).pow(1.5).mul(3)
        .add(1).pow(player.quantumDepth).sub(1)
    );
    return baseGain.mul(quantumUpgrades[3].effect).mul(calcGravitationalWaveBoost());
}

export function quantumFoamGainTick(deltaTime){
    player.quantumFoam = player.quantumFoam.add(calcQuantumFoamGain().mul(deltaTime));
}
