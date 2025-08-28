<script>
    import { formatTime } from "@/game/time";
    import { pointUpgrade } from "@/game/point-upgrade";

    export default {
        name: "GeneralStatistics",
        data(){
            return {
                secondsPlayed: 0,
                highestPoints: new Decimal(),
                pointUpgrades: 0
            };
        },
        methods: {
            update(){
                this.secondsPlayed = player.records.timePlayed;
                this.highestPoints = player.records.highestPoints;
                this.pointUpgrades = pointUpgrade.boughtAmount;
            }
        },
        computed: {
            timePlayed(){
                return formatTime(this.secondsPlayed);
            }
        }
    };
</script>

<template>
    <div id="general-statistics">
        <h3>General</h3>
        You have played for {{ timePlayed }}
        <br>
        Your highest points is {{ format(highestPoints) }}
        <br>
        You currently have {{ pointUpgrades }} point upgrades bought
    </div>
</template>

<style scoped>
    #general-statistics {
        text-align: center;
    }
</style>
