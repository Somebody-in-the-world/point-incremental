<script>
    export default {
        name: "SpacetimePointsDisplay",
        data(){
            return {
                spacetimePoints: new Decimal()
            };
        },
        methods: {
            update(){
                this.spacetimePoints = player.spacetimePoints;
            }
        }
    };
</script>

<template>
    You have <span style="font-size: 1.25em">{{ format(spacetimePoints) }}</span> spacetime points
</template>
