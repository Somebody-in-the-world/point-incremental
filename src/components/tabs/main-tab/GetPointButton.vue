<script>
    import { calcPointGain } from "@/game/points.js";

    export default {
        name: "GetPointButton",
        data(){
            return {
                pointGain: new Decimal()
            };
        },
        methods: {
            update(){
                this.pointGain = calcPointGain();
            },
            getPoint(){
                player.points = player.points.add(this.pointGain);
            }
        }
    };
</script>

<template>
    <button @click="getPoint">get {{ format(this.pointGain) }} points</button>
</template>
