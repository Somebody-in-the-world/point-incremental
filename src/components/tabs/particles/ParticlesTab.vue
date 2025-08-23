<script>
    import { calcElectromagneticForceBoost, 
        calcStrongForceBoost, calcWeakForceBoost, 
        calcParticleToForceRate } from "@/game/atomic";
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
                weakForceGain: new Decimal()
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
            }
        }
    };
</script>

<template>
    <h3 style="text-align: center">You have <span id="particles">{{ format(particles) }}</span> particles</h3>
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
                making all dark generators <span class="electron">{{ format(weakForceBoost) }}x</span> stronger
            </h4>
            <ParticleAssignmentButtons particleType="electron"/>
        </div>
    </div>
</template>

<style scoped>
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
