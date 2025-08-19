<script>
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
                this.hidden = player.currentChallenge != 6;
            }
        }
    };
</script>

<template>
    <h4 :hidden="hidden">There is {{ format(antiPoints) }} anti-points</h4>
</template>

