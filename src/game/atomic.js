import { atomicReset } from "./resets";

export function calcAtomicReq(){
    return new Decimal("1e1000");
}

export function canAtomic(){
    return player.spacetimePoints.gte(calcAtomicReq());
}

export function calcParticleGain(){
    return new Decimal(4).pow(player.spacetimePoints.log(10).div(1000).sub(1)).floor();
}

export function calcNextParticleReq(){
    return new Decimal(10).pow(calcParticleGain().add(1).log(4).add(1).mul(1000));
}

export function atomicPrestige(){
    player.particles = player.particles.add(calcParticleGain());
    player.records.atomicAmount += 1;
    atomicReset();
}

export function calcElectromagneticForceBoost(){
    return new Decimal(1).add(
        player.electromagneticForce.add(1).log(10).pow(0.25).div(50)
    );
}

export function calcStrongForceBoost(){
    return new Decimal(1).add(
        player.strongForce.add(1).log(10).pow(0.2).div(5)
    );
}

export function calcWeakForceBoost(){
    return new Decimal(1).add(
        player.weakForce.mul(10).pow(0.75).mul(5)
    );
}

export function calcParticleToForceRate(amount){
    return amount.pow(2);
}

export function forceGainTick(deltaTime){
    player.electromagneticForce = player.electromagneticForce.add(
        calcParticleToForceRate(player.protons).mul(deltaTime));
    player.strongForce = player.strongForce.add(
        calcParticleToForceRate(player.neutrons).mul(deltaTime));
    player.weakForce = player.weakForce.add(
        calcParticleToForceRate(player.electrons).mul(deltaTime));
}
