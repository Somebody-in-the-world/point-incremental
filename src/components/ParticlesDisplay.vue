<script>
    export default {
        name: "ParticlesDisplay",
        data(){
            return {
                particles: new Decimal()
            };
        },
        methods: {
            update(){
                this.particles = player.particles;
            }
        }
    };
</script>

<template>
    You have <span id="particles">{{ format(particles) }}</span> particles
    <br>
</template>

<style scoped>
    #particles {
        color: #60a0ff;
        text-shadow: 1px 1px 5px;
        font-size: 1.25em;
    }
</style>
