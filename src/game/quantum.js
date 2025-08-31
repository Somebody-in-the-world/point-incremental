import { atomicReset } from "./resets";
import { Purchasable } from "./purchasable";
import { calcParticleGain, canAtomic } from "./atomic";
import { Effect } from "./effect";
import Decimal from "break_eternity.js";

export const quantumUnlock = new Purchasable(
    false, () => player.quantumUnlocked, (val) => { player.quantumUnlocked = val; },
    () => new Decimal(1e6), (cost) => player.particles.gte(cost), null,
    (cost) => { player.particles = player.particles.sub(cost); }, null,
    "Unlock Quantum"
);

export const upgradeCosts = [
    1, 2, 3, 3
];

export const upgradeDescriptions = [
    "Gain more points based on quantum foam",
    "Gain more spacetime points based on quantum foam",
    "Gain more particles based on quantum foam",
    "Quadruple quantum foam gain"
];

export const upgradeEffects = [
    new Effect((boughtAmount) => player.quantumFoam.pow(100*boughtAmount), "mult"),
    new Effect((boughtAmount) => player.quantumFoam.pow(4*boughtAmount), "mult"),
    new Effect((boughtAmount) => player.quantumFoam.pow(0.08*boughtAmount), "mult"),
    new Effect((boughtAmount) => new Decimal(4).pow(boughtAmount), "mult")
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
            }, 25,
            upgradeDescriptions[i]
        ));
    }
    return upgrades;
})();

export const quantumDepthUpgrade = new Purchasable(
    true, () => player.quantumDepthUpgrade, 
    (boughtAmount) => { player.quantumDepthUpgrade = boughtAmount; },
    (boughtAmount) => new Decimal(1e6).mul(new Decimal(1e3).pow(boughtAmount)),
    (cost) => player.quantumFoam.gte(cost), 
    new Effect((boughtAmount) => new Decimal(boughtAmount), "add"),
    (cost) => { player.quantumFoam = player.quantumFoam.sub(cost); },
    null, "Increase the maximum quantum depth"
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
    return new Decimal(3).pow(
        player.points.add(1).log(10).div(200000).add(
            player.spacetimePoints.add(1).log(10).div(1000)).pow(0.75).add(
            calcParticleGain().add(1).log(10).add(1).log(10).mul(1.5)
        ).mul(player.quantumDepth**1.25)
    ).sub(1).mul(quantumUpgrades[3].effect).mul(3);
}

export function quantumFoamGainTick(deltaTime){
    player.quantumFoam = player.quantumFoam.add(calcQuantumFoamGain().mul(deltaTime));
}
