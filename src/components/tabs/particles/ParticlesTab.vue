<script>
    import { calcElectromagneticForceBoost, 
        calcStrongForceBoost, calcWeakForceBoost, 
        calcParticleToForceRate, calcGravityGain, 
        calcGravityToElectromagneticForceBoost,
        calcGravityToStrongForceBoost, 
        calcGravityToWeakForceBoost,
        calcGravitationalWavesGained,
        calcNextGravitationalWaveReq,
        calcGravitationalWaveBoost
    } from "@/game/atomic";
    import { nonRepeatableQuantumUpgrades } from "@/game/quantum";
    import ParticleAssignmentButtons from "./ParticleAssignmentButtons.vue";

    export default {
        name: "ParticlesTab",
        components: {
            ParticleAssignmentButtons
        },
        data(){
            return {
                particles: new Decimal(),
                protons: new Decimal(),
                neutrons: new Decimal(),
                electrons: new Decimal(),
                electromagneticForce: new Decimal(),
                strongForce: new Decimal(),
                weakForce: new Decimal(),
                electromagneticForceBoost: new Decimal(),
                strongForceBoost: new Decimal(),
                weakForceBoost: new Decimal(),
                electromagneticForceGain: new Decimal(),
                strongForceGain: new Decimal(),
                weakForceGain: new Decimal(),
                unlockedDistributeAll: false,
                gravity: new Decimal(),
                gravityUnlocked: false,
                gravityGain: new Decimal(),
                gravityToElectromagneticForceBoost: new Decimal(),
                gravityToStrongForceBoost: new Decimal(),
                gravityToWeakForceBoost: new Decimal(),
                gravitionalWavesUnlocked: false,
                gravitationalWavesGained: 0,
                nextGravitationalWaveReq: new Decimal(),
                gravitationalWaveBoost: new Decimal()
            };
        },
        methods: {
            update(){
                this.particles = player.particles;
                this.protons = player.protons;
                this.neutrons = player.neutrons;
                this.electrons = player.electrons;
                this.electromagneticForce = player.electromagneticForce;
                this.strongForce = player.strongForce;
                this.weakForce = player.weakForce;
                this.electromagneticForceBoost = calcElectromagneticForceBoost();
                this.strongForceBoost = calcStrongForceBoost();
                this.weakForceBoost = calcWeakForceBoost();
                this.electromagneticForceGain = calcParticleToForceRate(player.protons);
                this.strongForceGain = calcParticleToForceRate(player.neutrons);
                this.weakForceGain = calcParticleToForceRate(player.electrons);
                this.unlockedDistributeAll = achievements[33].unlocked;
                this.gravity = player.gravity;
                this.gravityUnlocked = nonRepeatableQuantumUpgrades[0].boughtAmount;
                this.gravityGain = calcGravityGain();
                this.gravityToElectromagneticForceBoost = calcGravityToElectromagneticForceBoost();
                this.gravityToStrongForceBoost = calcGravityToStrongForceBoost();
                this.gravityToWeakForceBoost = calcGravityToWeakForceBoost();
                this.gravitionalWavesUnlocked = nonRepeatableQuantumUpgrades[1].boughtAmount;
                this.gravitationalWavesGained = calcGravitationalWavesGained();
                this.nextGravitationalWaveReq = calcNextGravitationalWaveReq();
                this.gravitationalWaveBoost = calcGravitationalWaveBoost();
            },
            distributeAll(){
                player.protons = player.protons.add(player.particles.div(3).floor());
                player.neutrons = player.neutrons.add(player.particles.div(3).floor());
                player.electrons = player.electrons.add(player.particles.div(3).floor());
                player.particles = player.particles.mod(3);   
            }
        }
    };
</script>

<template>
    <h3 style="text-align: center">You have <span id="particles">{{ format(particles) }}</span> particles</h3>
    <button id="distribute-all-button" v-if="unlockedDistributeAll" @click="distributeAll">Distribute all</button>
    <div id="particles-grid">
        <div>
            <h4>
                You have <span class="proton">{{ format(protons) }}</span> protons, 
                producing <span class="proton">{{ format(electromagneticForceGain) }}</span> electromagnetic force per second<br>
                You have <span class="proton">{{ format(electromagneticForce) }}</span> electromagnetic force, 
                increasing point gain by <span class="proton">^{{ format(electromagneticForceBoost, 4) }}</span>
            </h4>
            <ParticleAssignmentButtons particleType="proton" />
        </div>
        <div>
            <h4>
                You have <span class="neutron">{{ format(neutrons) }}</span> neutrons, 
                producing <span class="neutron">{{ format(strongForceGain) }}</span> strong force per second<br>
                You have <span class="neutron">{{ format(strongForce) }}</span> strong force, 
                multiplying dimension per purchase multipliers by <span class="neutron">{{ format(strongForceBoost, 3) }}x</span>
            </h4>
            <ParticleAssignmentButtons particleType="neutron" />
        </div>
        <div>
            <h4>
                You have <span class="electron">{{ format(electrons) }}</span> electrons, 
                producing <span class="electron">{{ format(weakForceGain) }}</span> weak force per second<br>
                You have <span class="electron">{{ format(weakForce) }}</span> weak force, 
                increasing dark matter boost exponent by <span class="electron">+^{{ format(weakForceBoost, 4) }}</span>
            </h4>
            <ParticleAssignmentButtons particleType="electron"/>
        </div>
    </div>
    <h4 v-if="gravityUnlocked" style="text-align: center;">
        You have <span class="gravity">{{ format(gravity) }}</span> gravity<br>
        You are producing <span class="gravity">{{ format(gravityGain) }}</span> gravity per second (based on total particles)<br>
        Gravity is boosting the electromagnetic force effect by <span class="proton">+{{ format(gravityToElectromagneticForceBoost.sub(1).mul(100)) }}%</span>, 
        boosting the strong force effect by <span class="neutron">+{{ format(gravityToStrongForceBoost.sub(1).mul(100)) }}%</span>, and 
        boosting the weak force effect by <span class="electron">+{{ format(gravityToWeakForceBoost.sub(1).mul(100)) }}%</span>
        <br>
        <span v-if="gravitionalWavesUnlocked">
            You have gained <span class="gravity">{{ gravitationalWavesGained }}</span> gravitational waves, 
            next gravitational wave at <span class="gravity">{{ format(nextGravitationalWaveReq) }}</span> gravity<br>
            Your gravitational waves multiply quantum foam gain by <span class="gravity">{{ format(gravitationalWaveBoost) }}x</span>
        </span>
    </h4>
</template>

<style scoped>
    #distribute-all-button {
        margin: auto;
        display: flex;
    }

    #particles {
        color: #60a0ff;
        text-shadow: 2px 2px 10px;
        font-size: 1.25em;
    }

    #particles-grid {
        display: grid;
        grid-template-columns: 33% 33% 33%;
    }

    #particles-grid > div {
        text-align: center;
    }
</style>
