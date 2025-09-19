import { atomicReset } from "./resets";
import { Purchasable } from "./purchasable";
import { calcGravitationalWaveBoost, calcGravitationalWavesGained, calcParticleGain, canAtomic } from "./atomic";
import { decayEnergyUpgrades } from "./decay";
import { Effect } from "./effect";
import Decimal from "break_eternity.js";
import { atomicChallenges } from "./atomic-challenges";
import { calcTimeSpeed } from "./time";

export const quantumUnlock = new Purchasable(
    false, () => player.quantumUnlocked, (val) => { player.quantumUnlocked = val; },
    () => new Decimal(1e6), (cost) => player.particles.gte(cost), null,
    (cost) => { player.particles = player.particles.sub(cost); }, null,
    "Unlock Quantum"
);

export const upgradeCosts = [
    1, 2, 5, 3, 8, 7
];

export const upgradeCaps = [
    40, 25, 25, 20, 10, 10
];

export const upgradeDescriptions = [
    "Gain more points based on quantum foam",
    "Gain more spacetime points based on quantum foam",
    "Gain more particles based on quantum foam",
    "Multiply quantum foam gain",
    "Gain more gravity based on quantum foam",
    "Gravitational waves multiply gravity"
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
    new Decimal(1e18),
    new Decimal(1e33),
    new Decimal(1e35),
    new Decimal(1e45),
    new Decimal(1e108)
];

export const nonRepeatableUpgradeDescriptions = [
    "Unlock gravity (in particles tab)",
    "Unlock gravitational waves",
    "Unlock more quantum upgrades",
    "Unlock Atomic Challenges and you can bulk buy quantum upgrades",
    "Uncap quantum upgrades (though they get more expensive)",
    "Passively gain 1% of SP gained on spacetime per second",
    "Boost per gravitational wave 1.25x -> 1.3x",
    "Unlock dimensional vortexes, which increases dimension caps (in dimensional tab)"
];

export const nonRepeatableUpgradeDepthReqs = [
    2, 2, 3, 4, 6, 6, 7, 11
];

export const upgradeEffects = [
    new Effect((boughtAmount) => atomicChallenges[6].isRunning ? new Decimal(1) : player.quantumFoam.add(1).pow(125*boughtAmount), "mult"),
    new Effect((boughtAmount) => atomicChallenges[6].isRunning ? new Decimal(1) : player.quantumFoam.add(1).pow(4*boughtAmount), "mult"),
    new Effect((boughtAmount) => Decimal.min(player.quantumFoam.add(1).pow(0.1), 100).pow(Math.min(boughtAmount, 4))
        .mul(Decimal.min(player.quantumFoam.pow(0.033), 4).pow(Math.min(Math.max(boughtAmount-4, 0), 6))
        .mul(player.quantumFoam.pow(0.01*Math.max(boughtAmount-10, 0)))
    ), "mult"),
    new Effect((boughtAmount) => new Decimal(4).pow(
        Math.min(boughtAmount, 10)).mul(new Decimal(2).pow(Math.min(Math.max(boughtAmount-10, 0), 25))
        .mul(new Decimal(2).sqrt().pow(Math.max(boughtAmount-35, 0)))), "mult"),
    new Effect((boughtAmount) => player.quantumFoam.add(1).log(10).pow(0.4).div(2).add(1)
        .pow(Math.min(boughtAmount, 10)+Math.max(boughtAmount-10, 0)*0.75), "mult"),
    new Effect((boughtAmount) => new Decimal(
        Math.min((calcGravitationalWavesGained()+1)**0.25, 3)).add(1)
        .pow(Math.min(boughtAmount, 10))
        .mul(new Decimal((calcGravitationalWavesGained()+1)**0.1).add(1).pow(Math.max(boughtAmount-10, 0)*0.5)), "mult")
];

export const quantumUpgrades = (function(){
    const upgrades = [];
    for(const i in upgradeCosts){
        upgrades.push(new Purchasable(
            true, () => player.quantumUpgrades[i], 
            (boughtAmount) => { player.quantumUpgrades[i] = boughtAmount; },
            () => new Decimal(calcTotalUpgradeCost(i, player.quantumUpgradeBulk)),
            (cost) => player.quarks >= cost.toNumber(), upgradeEffects[i],
            function(cost){ 
                player.quarks = player.quarks - cost.toNumber();
                let bulk = player.quantumUpgradeBulk;
                if(!(nonRepeatableQuantumUpgrades[4].boughtAmount)){
                    bulk = Math.min(quantumUpgrades[i].cap-quantumUpgrades[i].boughtAmount, bulk);
                }
                this.boughtAmount += bulk-1;
            }, () => nonRepeatableQuantumUpgrades[4].boughtAmount ? Infinity : upgradeCaps[i],
            upgradeDescriptions[i], upgradeUnlockReqs[i]
        ));
    }
    return upgrades;
})();

function calcTotalUpgradeCost(id, bulk){
    if(!(nonRepeatableQuantumUpgrades[4].boughtAmount)){
        bulk = Math.min(quantumUpgrades[id].cap-quantumUpgrades[id].boughtAmount, bulk);
    }
    let cost = 0;
    let bought = quantumUpgrades[id].boughtAmount;
    for(let _ = 0; _ < bulk; _++){
        let pastCap = Math.floor(bought / upgradeCaps[id]);
        cost += Math.min((pastCap+1)**2, 2**pastCap) * upgradeCosts[id];
        bought++;
    }
    return cost;
}

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
    atomicReset();
    player.quarks = player.totalQuarks;
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
    let baseGain = player.points.add(1).log(10).div(200000).mul(
        player.spacetimePoints.add(1).log(10).div(1000)).pow(2)
    .mul(calcParticleGain().add(1).log(10).add(1)).mul(
        new Decimal(player.quantumDepth).pow(1.5).mul(3)
        .add(1).pow(player.quantumDepth).sub(1)
    );
    baseGain = baseGain.mul(quantumUpgrades[3].effect).mul(calcGravitationalWaveBoost()).mul(decayEnergyUpgrades[0].effect);
    if(achievements[40].unlocked) baseGain = baseGain.mul(1.1);
    if(achievements[53].unlocked) baseGain = baseGain.mul(1.5);
    if(atomicChallenges[4].completed) baseGain = baseGain.mul(atomicChallenges[4].effect);
    return baseGain;
}

export function quantumFoamGainTick(deltaTime){
    player.quantumFoam = player.quantumFoam.add(calcQuantumFoamGain().mul(deltaTime).mul(calcTimeSpeed()));
}
