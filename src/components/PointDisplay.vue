<script>
    export default {
        name: "PointDisplay",
        data(){
            return {
                points: new Decimal(),
                hidden: false
            }
        },
        methods: {
            update(){
                this.points = player.points;
            }
        }
    };
</script>

<template>
    <h2 :hidden="hidden">You have {{ format(points) }} points</h2>
</template>
