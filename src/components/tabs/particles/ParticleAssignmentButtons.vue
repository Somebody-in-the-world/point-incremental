<script>
    export default {
        name: "ParticleAssignmentButtons",
        props: {
            particleType: { type: String, required: true }
        },
        data(){
            return {
                canAssign: false
            };
        },
        methods: {
            update(){
                this.canAssign = player.particles.gt(0);
            },
            assignOne(){
                if(player.particles.lt(1)) return;
                player.particles = player.particles.sub(1);
                if(this.particleType == "proton") player.protons = player.protons.add(1);
                if(this.particleType == "neutron") player.neutrons = player.neutrons.add(1);
                if(this.particleType == "electron") player.electrons = player.electrons.add(1);
            },
            assignAll(){
                if(this.particleType == "proton") player.protons = player.protons.add(player.particles);
                if(this.particleType == "neutron") player.neutrons = player.neutrons.add(player.particles);
                if(this.particleType == "electron") player.electrons = player.electrons.add(player.particles);
                player.particles = new Decimal(0);
            }
        }
    };
</script>

<template>
    <button :disabled="!canAssign" @click="assignOne">Assign 1 Particle</button>
    <br>
    <button :disabled="!canAssign" @click="assignAll">Assign All Particles</button>
</template>

