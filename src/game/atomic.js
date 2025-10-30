import { atomicReset } from "./resets";
import { Milestone } from "./milestone";
import { darkGenerators } from "./dark-matter";
import { tearSpacetimeUpgrades } from "./tear-spacetime";
import { spacetimeChallenges } from "./spacetime-challenges";
import { nonRepeatableQuantumUpgrades, quantumUpgrades } from "./quantum";
import { decayEnergyUpgrades } from "./decay";
import { atomicChallenges } from "./atomic-challenges";
import { calcTimeSpeed } from "./time";

export function calcAtomicReq(){
    return player.currentAtomicChallenge == 0 ? 
        new Decimal("1e1000") : atomicChallenges[player.currentAtomicChallenge-1].goal;
}

export function canAtomic(){
    return player.spacetimePoints.gte(calcAtomicReq());
}

export function calcParticleGain(){
    if(!canAtomic()) return new Decimal(0);
    return new Decimal(4).pow(player.spacetimePoints.log(10).div(1000).sub(1))
        .mul(decayEnergyUpgrades[1].effect).mul(quantumUpgrades[2].effect)
        .mul(atomicChallenges[0].effect).mul(achievements[54].unlocked ? 1.84e19 : 1).floor();
}

export function calcNextParticleReq(){
    return new Decimal(10).pow(calcParticleGain().add(1)
        .div(quantumUpgrades[2].effect).div(decayEnergyUpgrades[1].effect)
        .div(atomicChallenges[0].effect).div(achievements[54].unlocked ? 1.84e19 : 1)
        .log(4).add(1).mul(1000));
}

export function atomicPrestige(){
    player.particles = player.particles.add(calcParticleGain());
    player.records.atomicAmount += 1;
    if(player.records.timeInCurrentAtomic < player.records.fastestAtomic){
        player.records.fastestAtomic = player.records.timeInCurrentAtomic;
    }

    player.atomicMilestones[0] = true;
    if(!darkGenerators[5].boughtAmount){
        player.atomicMilestones[1] = true;
    }
    if((!darkGenerators[4].boughtAmount) && (!darkGenerators[5].boughtAmount)){
        player.atomicMilestones[2] = true;
    }
    if(!(tearSpacetimeUpgrades[10].boughtAmount) && !(tearSpacetimeUpgrades[11].boughtAmount)){
        player.atomicMilestones[3] = true;
    }
    if(player.records.spacetimeAmount <= 100){
        player.atomicMilestones[4] = true;
    }
    if(!atomicMilestones[5].unlocked){
        player.atomicMilestones[5] = true;
        for(let i = 3; i < 5; i++){
            if(spacetimeChallenges[i].completed){
                player.atomicMilestones[5] = false;
            }
        }
    }
    if(!atomicMilestones[6].unlocked){
        player.atomicMilestones[6] = true;
        for(let i = 3; i < 5; i++){
            if(darkGenerators[i].boughtAmount > 0){
                player.atomicMilestones[6] = false;
            }
        }
    }
    if(player.records.spacetimeAmount <= 75){
        player.atomicMilestones[7] = true;
    }
    if(player.records.atomicAmount >= 25){
        player.atomicMilestones[8] = true;
    }

    if(player.records.fastestAtomic <= 15){
        player.atomicMilestones[9] = true;
    }
    if(player.currentAtomicChallenge > 0) atomicChallenges[player.currentAtomicChallenge-1].complete();
    
    atomicReset();
}

export function calcElectromagneticForceBoost(){
    return new Decimal(1).add(
        player.electromagneticForce.add(1).log(10).pow(0.25).div(45).mul(calcGravityToElectromagneticForceBoost())
    );
}

export function calcStrongForceBoost(){
    return new Decimal(1).add(
        player.strongForce.add(1).log(10).pow(0.3).div(5).mul(calcGravityToStrongForceBoost())
    );
}

export function calcWeakForceBoost(){
    return player.weakForce.add(1).log(10).pow(0.25).mul(2.5).mul(calcGravityToWeakForceBoost());
}

export function calcParticleToForceRate(amount){
    return amount.pow(2);
}

export function calcGravityGain(){
    if(!nonRepeatableQuantumUpgrades[0].boughtAmount) return new Decimal(0);
    let baseGain = player.protons.add(player.neutrons).add(player.electrons).div(1e10).pow(0.4);
    if(baseGain.gte(1e40)) baseGain = baseGain.div(1e40).pow(0.5).mul(1e40)
    if(baseGain.gte(1e70)) baseGain = baseGain.div(1e70).pow(0.5).mul(1e70)
    if(baseGain.gte(1e120)) baseGain = baseGain.div(1e120).pow(0.2).mul(1e120)
    baseGain = baseGain.mul(quantumUpgrades[4].effect).mul(quantumUpgrades[5].effect);
    return baseGain;
}

export function calcParticlesPerMinute(){
    const particlesPerMin = calcParticleGain().div(player.records.timeInCurrentAtomic).mul(60);
    if(particlesPerMin.gte(player.peakParticlesPerMin)){
        player.peakParticlesPerMin = particlesPerMin;
        player.particlesAtPeakParticlesPerMin = calcParticleGain();
    };
    return particlesPerMin;
}

export function forceGainTick(deltaTime){
    player.gravity = player.gravity.add(calcGravityGain().mul(deltaTime).mul(calcTimeSpeed()));
    if(atomicChallenges[4].isRunning) return;
    player.electromagneticForce = player.electromagneticForce.add(
        calcParticleToForceRate(player.protons).mul(deltaTime).mul(calcTimeSpeed()));
    player.strongForce = player.strongForce.add(
        calcParticleToForceRate(player.neutrons).mul(deltaTime).mul(calcTimeSpeed()));
    player.weakForce = player.weakForce.add(
        calcParticleToForceRate(player.electrons).mul(deltaTime).mul(calcTimeSpeed()));
}

export function calcGravityToElectromagneticForceBoost(){
    return player.gravity.add(1).log(10).pow(0.4).div(25).add(1);
}

export function calcGravityToStrongForceBoost(){
    return player.gravity.add(1).log(10).pow(0.5).div(5).add(1);
}

export function calcGravityToWeakForceBoost(){
    return player.gravity.add(1).log(10).pow(0.3).div(50).add(1);
}

export function calcGravitationalWavesGained(){
    if(!(nonRepeatableQuantumUpgrades[1].boughtAmount)) return 0;
    return Math.max(player.gravity.add(1).div(1e3).log(2).add(1).floor().toNumber(), 0);
}

export function calcGravitationalWaveBoost(){
    return new Decimal(1.25).add(nonRepeatableQuantumUpgrades[6].boughtAmount*0.05).pow(calcGravitationalWavesGained());
}

export function calcNextGravitationalWaveReq(){
    return new Decimal(2).pow(calcGravitationalWavesGained()).mul(1e3);
}

const milestoneGoals = [
    "Go atomic",
    "Go atomic without buying tier 6 dark generators",
    "Go atomic without buying tier 5-6 dark generators",
    "Go atomic without buying the 11th and 12th tear spacetime upgrade",
    "Go atomic with at most 100 spacetimes",
    "Go atomic without completing challenges 4-6",
    "Go atomic without buying tier 4-6 dark generators",
    "Go atomic with at most 75 spacetimes",
    "Go atomic 25 times",
    "Go atomic in 15 seconds"
];

const milestoneRewards = [
    "Unlock the SP multiplier autobuyer",
    "Start atomic resets with 50 spacetimes and spacetime tore",
    "Start atomic resets with all spacetime upgrades",
    "Start atomic resets with all tear spacetime upgrades",
    "Unlock more options for automatic spacetime",
    "Challenges are automatically completed on atomic",
    "Unlock autobuyers for dark generators 1-3",
    "Unlock autobuyers for dark generators 4-6",
    "Start with all dark generators unlocked",
    "Unlock automatic atomic"
]

export const atomicMilestones = (function(){
    const milestones = [];
    for(const i in milestoneRewards){
        milestones.push(new Milestone(
            () => player.atomicMilestones[i],
            milestoneGoals[i],
            milestoneRewards[i]
        ));
    }
    return milestones;
})();
