<script>
    import { calcCompressedPointsGain, 
            calcNextCompressedPoint,
            compressedPointsPrestige
        } from "@/game/compressed-points";

    export default {
        name: "CompressedPointsPrestige",
        data(){
            return {
                compressedPointsGain: new Decimal(),
                nextCompressedPoint: new Decimal(),
                showNextCP: true,
                canPrestige: false
            };
        },
        methods: {
            update(){
                this.compressedPointsGain = calcCompressedPointsGain();
                this.nextCompressedPoint = calcNextCompressedPoint();
                this.showNextCP = this.compressedPointsGain.lt(1000);
                this.canPrestige = this.compressedPointsGain.gt(0);
            },
            compressedPointsPrestige
        }
    };
</script>

<template>
    <button @click="compressedPointsPrestige" :disabled="!canPrestige">
        Compress all your points into 
        {{ format(compressedPointsGain) }} compressed points
        <span :hidden="!showNextCP">
            <br>(Next at {{ format(nextCompressedPoint) }} points)
        </span>
    </button>
</template>
