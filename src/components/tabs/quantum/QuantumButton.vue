<script>
    import { quantumUnlock, calcMaxAvailQuantumDepth, enterQuantum, exitQuantum } from "@/game/quantum";
    import { atomicReset } from "@/game/resets";
    import Upgrade from "@/components/reusable/Upgrade.vue";

    export default {
        name: "QuantumButton",
        data(){
            return {
                quantumUnlock,
                unlocked: false,
                depth: 1,
                inQuantum: false,
                maxAvailQuantumDepth: 1
            }
        },
        components: {
            Upgrade
        },
        methods: {
            update(){
                this.unlocked = quantumUnlock.boughtAmount;
                this.depth = player.projectedQuantumDepth;
                this.inQuantum = player.quantumDepth > 0;
                this.maxAvailQuantumDepth = calcMaxAvailQuantumDepth();
            },
            quantumButtonClick(){
                if(this.inQuantum){
                    exitQuantum();
                } else {
                    enterQuantum(this.depth);
                }
            },
            decreaseDepth(){
                atomicReset();
                player.projectedQuantumDepth -= 1;
            },
            increaseDepth(){
                atomicReset();
                player.projectedQuantumDepth += 1;
            }
        }
    }
</script>

<template>
    <Upgrade class="atomic quantum-btn" v-if="!unlocked"
        :purchasable="quantumUnlock" currency="particles" />
    <button class="atomic quantum-btn" v-if="unlocked" @click="quantumButtonClick" >
        <span v-if="!inQuantum">Enter the quantum at depth {{ depth }}</span>
        <span v-if="inQuantum">Exit the quantum run and force an atomic reset</span>
    </button>
    <div id="quantum-btn-grid" v-if="maxAvailQuantumDepth > 1 && unlocked">
        <button class="atomic quantum-btn" :disabled="depth == 1" @click="decreaseDepth">Decrease depth by 1</button>
        <button class="atomic quantum-btn" :disabled="depth >= maxAvailQuantumDepth" @click="increaseDepth">Increase depth by 1</button>
    </div>
</template>

<style scoped>
    .quantum-btn {
        margin: auto;
        text-align: center;
        width: 100%;
        height: 15vh;
    }

    #quantum-btn-grid {
        display: grid;
        grid-template-columns: 50% 50%;
    }

    #quantum-btn-grid > button {
        height: 5vh !important;
    }
</style>

