<script>
    import { spacetimeChallenges } from "@/game/spacetime-challenges";

    export default {
        name: "AntiPointsDisplay",
        data(){
            return {
                antiPoints: new Decimal(),
                hidden: false
            }
        },
        methods: {
            update(){
                this.antiPoints = player.antiPoints;
                this.hidden = !(spacetimeChallenges[5].isRunning);
            }
        }
    };
</script>

<template>
    <h4 :hidden="hidden">There is {{ format(antiPoints) }} anti-points</h4>
</template>

