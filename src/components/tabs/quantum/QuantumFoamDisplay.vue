<script>
    import { calcQuantumFoamGain } from "@/game/quantum";

    export default {
        name: "QuantumFoamDisplay",
        data(){
            return {
                quantumFoam: new Decimal(),
                quantumFoamGain: new Decimal()
            };
        },
        methods: {
            update(){
                this.quantumFoam = player.quantumFoam;
                this.quantumFoamGain = calcQuantumFoamGain();
            }
        }
    };
</script>

<template>
    <h3 style="text-align: center;">
        You have <span class="quantum-foam">{{ format(quantumFoam) }}</span> quantum foam 
        (<span class="quantum-foam">{{ format(quantumFoamGain) }}</span>/s)
    </h3>
</template>

<style scoped>
    .quantum-foam {
        font-size: 1.25em;
        color: orange;
        text-shadow: 0px 2px 5px;
    }
</style>

