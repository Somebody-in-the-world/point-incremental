<script>
    import { calcCompressedPointsBoost } from "@/game/compressed-points";

    export default {
        name: "CompressedPointsDisplay",
        data(){
            return {
                compressedPoints: new Decimal(),
                compressedPointsBoost: new Decimal()
            };
        },
        methods: {
            update(){
                this.compressedPoints = player.compressedPoints;
                this.compressedPointsBoost = calcCompressedPointsBoost();
            }
        }
    };
</script>

<template>
    <h3>
        You have {{ format(compressedPoints) }} compressed points, 
        giving a {{ format(compressedPointsBoost) }}x multiplier to your point gain
    </h3>
</template>
