<script>
    import { calcDimensionalPointsGain, 
            calcNextDimensionalPoint,
            dimensionalPointsPrestige
        } from "@/game/dimensional";

    export default {
        name: "DimensionalPointsPrestige",
        data(){
            return {
                dimensionalPointsGain: new Decimal(),
                nextDimensionalPoint: new Decimal(),
                showNextDP: true,
                canPrestige: false
            };
        },
        methods: {
            update(){
                this.dimensionalPointsGain = calcDimensionalPointsGain();
                this.nextDimensionalPoint = calcNextDimensionalPoint();
                this.showNextDP = this.dimensionalPointsGain.lt(1000);
                this.canPrestige = this.dimensionalPointsGain.gt(0);
            },
            dimensionalPointsPrestige
        }
    };
</script>

<template>
    <button @click="dimensionalPointsPrestige" :disabled="!canPrestige">
        Convert all your points into 
        {{ format(dimensionalPointsGain) }} dimensional points
        <span :hidden="!showNextDP">
            <br>(Next at {{ format(nextDimensionalPoint) }} points)
        </span>
    </button>
</template>
