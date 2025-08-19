<script>
    import { automationPointsSacrifice } from "@/game/automation-points";

    export default {
        name: "AutomationPointsSacrifice",
        data(){
            return {
                automationPointsGain: new Decimal(),
                canSacrifice: false
            };
        },
        methods: {
            update(){
                this.automationPointsGain = player.compressedPoints;
                this.canSacrifice = this.automationPointsGain.gt(0);
            },
            automationPointsSacrifice
        }
    };
</script>

<template>
    <button :disabled="!canSacrifice" @click="automationPointsSacrifice">
        Sacrifice all your compressed points 
        into {{ format(automationPointsGain) }} automation points
    </button>
</template>
