<script>
    import CompressedPointsDisplay from "./CompressedPointsDisplay.vue";
    import CompressedPointsPrestige from "./CompressedPointsPrestige.vue";
    
    export default {
        name: "CompressedPointsComponent",
        components: {
            CompressedPointsDisplay,
            CompressedPointsPrestige
        },
        data(){
            return {
                shown: false
            };
        },
        methods: {
            update(){
                this.shown = player.points.gte(250) || player.records.pointCompressionAmount > 0;
            }
        }
    };
</script>

<template>
    <div v-if="shown">
        <hr>
        <CompressedPointsDisplay />
        <CompressedPointsPrestige />
    </div>
</template>
