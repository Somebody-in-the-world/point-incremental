import { atomicReset } from "./resets";
import { Milestone } from "./milestone";
import { darkGenerators } from "./dark-matter";
import { tearSpacetimeUpgrades } from "./tear-spacetime";
import { challenges } from "./challenges";
import { nonRepeatableQuantumUpgrades, quantumUpgrades } from "./quantum";

export function calcAtomicReq(){
    return new Decimal("1e1000");
}

export function canAtomic(){
    return player.spacetimePoints.gte(calcAtomicReq());
}

export function calcParticleGain(){
    if(!canAtomic()) return new Decimal(0);
    return new Decimal(4).pow(player.spacetimePoints.log(10).div(1000).sub(1)).mul(quantumUpgrades[2].effect).floor();
}

export function calcNextParticleReq(){
    return new Decimal(10).pow(calcParticleGain().add(1).div(quantumUpgrades[2].effect).log(4).add(1).mul(1000));
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
            if(challenges[i].completed){
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
    return player.protons.add(player.neutrons).add(player.electrons).div(1e10).pow(0.4);
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
    player.electromagneticForce = player.electromagneticForce.add(
        calcParticleToForceRate(player.protons).mul(deltaTime));
    player.strongForce = player.strongForce.add(
        calcParticleToForceRate(player.neutrons).mul(deltaTime));
    player.weakForce = player.weakForce.add(
        calcParticleToForceRate(player.electrons).mul(deltaTime));
    player.gravity = player.gravity.add(calcGravityGain().mul(deltaTime));
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
