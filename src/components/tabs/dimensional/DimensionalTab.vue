<script>
    import DimensionalPointsDisplay from "./DimensionalPointsDisplay.vue";
    import DimensionalPrestige from "./DimensionalPrestige.vue";
    import DimensionalPowerDisplay from "./DimensionalPowerDisplay.vue";
    import DimensionsDisplay from "./DimensionsDisplay.vue";

    export default {
        name: "DimensionalPointsComponent",
        components: {
            DimensionalPointsDisplay,
            DimensionalPrestige,
            DimensionalPowerDisplay,
            DimensionsDisplay
        },
        data(){
            return {
                showDimensions: false
            };
        },
        methods: {
            update(){
                this.showDimensions = player.records.dimensionalAmount > 0;
            }
        }
    };
</script>

<template>
    <DimensionalPointsDisplay />
    <DimensionalPrestige />
    <div v-if="showDimensions">
        <DimensionalPowerDisplay />
        <DimensionsDisplay />
    </div>
</template>
