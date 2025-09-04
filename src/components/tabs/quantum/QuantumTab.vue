<script>
    import QuantumButton from "./QuantumButton.vue";
    import QuantumFoamDisplay from "./QuantumFoamDisplay.vue";
    import QuarkDisplay from "./QuarkDisplay.vue";
    import Upgrade from "@/components/reusable/Upgrade.vue";
    import { quantumUnlock, calcQuantumNerf, nonRepeatableQuantumUpgrades,
        quantumUpgrades, respecUpgrades, quantumDepthUpgrade } from "@/game/quantum";

    export default {
        name: "QuantumTab",
        data(){
            return {
                unlocked: false,
                depth: 0,
                depthNerf: 1,
                quantumUpgrades,
                quantumDepthUpgrade,
                nonRepeatableQuantumUpgrades
            };
        },
        components: {
            QuantumButton,
            QuantumFoamDisplay,
            QuarkDisplay,
            Upgrade
        },
        methods: {
            update(){
                this.unlocked = quantumUnlock.boughtAmount;
                this.depth = player.projectedQuantumDepth;
                this.depthNerf = calcQuantumNerf(this.depth);
            },
            respecUpgrades
        }
    }
</script>

<template>
    <QuantumButton />
    <h4 style="text-align: center;" v-if="unlocked" >
        Entering the quantum at depth {{ depth }} will force an atomic reset, 
        and will start a quantum run with point gain ^{{ depthNerf.toFixed(4) }}
        <br>
        Reaching atomic in the quantum run will produce quantum foam based on your points,
        SP, and particles gained on atomic
    </h4>
    <QuantumFoamDisplay v-if="unlocked" />
    <QuarkDisplay v-if="unlocked" />
    <button style="width: 100%; padding: 10px 0;" @click="respecUpgrades" v-if="unlocked">Respec all upgrades</button>
    <div class="upgrade-container">
        <Upgrade v-if="unlocked" v-for="(upgrade, idx) in quantumUpgrades"
            :purchasable="upgrade" currency="quarks" :key="idx" >
            Level {{ upgrade.boughtAmount }}<br>
        </Upgrade>
    </div>
    <Upgrade v-if="unlocked" style="width: 100%;"
        :purchasable="quantumDepthUpgrade" currency="Quantum Foam" />
    <div class="upgrade-container">
        <Upgrade v-if="unlocked" v-for="(upgrade, idx) in nonRepeatableQuantumUpgrades"
            :purchasable="upgrade" currency="quantum foam" :key="idx" >
        </Upgrade>
    </div>
</template>

<style>
    .upgrade-container {
        display: grid;
        grid-template-columns: 50% 50%;
    }
</style>
