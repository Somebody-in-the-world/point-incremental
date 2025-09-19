<script>
    import { dimensionalVortex, calcDimensionCaps } from "@/game/dimensional";
    import Purchasable from "@/components/reusable/Purchasable.vue";

    export default {
        name: "DimensionalVortexDisplay",
        components: {
            Purchasable
        },
        data(){
            return {
                dimensionalVortex,
                dimensionalVortexCost: new Decimal(),
                dimensionalVortexAmount: 0,
                dimensionalVortexEffect: 0
            }
        },
        methods: {
            update(){
                this.dimensionalVortexCost = dimensionalVortex.cost;
                this.dimensionalVortexAmount = dimensionalVortex.boughtAmount;
                this.dimensionalVortexEffect = dimensionalVortex.effectObject.formula(dimensionalVortex.boughtAmount+1).toNumber()*1_000_000
                    - calcDimensionCaps();
            }
        }
    };
</script>

<template>
    <Purchasable :purchasable="dimensionalVortex" id="dimensional-vortex-button">
        Create a dimensional vortex ({{ dimensionalVortexAmount }})
        <br>
        Increase dimension caps by {{ formatInt(dimensionalVortexEffect) }}
        <br>
        Cost: {{ format(dimensionalVortexCost) }} DP
    </Purchasable>
</template>

<style scoped>
    #dimensional-vortex-button {
        display: block;
        margin: auto;
        padding: 15px;
        background-color: #39254d;
        text-shadow: 0 2px 5px;
        color: white;
    }

    #dimensional-vortex-button:disabled {
        background-color: #301934;
        color: #a0a0a0;
        text-shadow: 0 0 0;
    }
</style>
