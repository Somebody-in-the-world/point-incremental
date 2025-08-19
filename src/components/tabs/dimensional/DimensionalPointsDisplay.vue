<script>
    export default {
        name: "DimensionalPointsDisplay",
        data(){
            return {
                dimensionalPoints: new Decimal()
            };
        },
        methods: {
            update(){
                this.dimensionalPoints = player.dimensionalPoints;
            }
        }
    };
</script>

<template>
    <h3>
        You have {{ format(dimensionalPoints) }} dimensional points
    </h3>
</template>
