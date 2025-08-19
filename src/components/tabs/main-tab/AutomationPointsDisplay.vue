<script>
    import { calcAutomaticPointGainPercent } from "@/game/automation-points";

    export default {
        name: "AutomationPointsDisplay",
        data(){
            return {
                automationPoints: new Decimal(),
                automaticPointGainPercent: new Decimal()
            };
        },
        methods: {
            update(){
                this.automationPoints = player.automationPoints;
                this.automaticPointGainPercent = 
                    calcAutomaticPointGainPercent().mul(100);
            }
        }
    };
</script>

<template>
    <h3>
        You have {{ format(automationPoints) }} automation points, 
        giving you {{ format(automaticPointGainPercent) }}% of point gain per second
    </h3>
</template>
