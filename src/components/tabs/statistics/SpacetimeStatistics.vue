<script>
    import { formatTime } from "@/game/time";

    export default {
        name: "SpacetimeStatistics",
        data(){
            return {
                spacetimeAmount: 0,
                timeInCurrentSpacetime: 0,
                fastestSpacetime: 99999999,
                highestSPPerMin: new Decimal(),
                hasAtomic: false
            };
        },
        methods: {
            update(){
                this.spacetimeAmount = player.records.spacetimeAmount;
                this.timeInCurrentSpacetime = player.records.timeInCurrentSpacetime;
                this.fastestSpacetime = player.records.fastestSpacetime;
                this.highestSPPerMin = player.records.highestSPPerMin;
                this.hasAtomic = player.records.atomicAmount > 0;
            }
        },
        computed: {
            formattedTimeInCurrentSpacetime(){
                return formatTime(this.timeInCurrentSpacetime);
            },
            formattedFastestSpacetime(){
                return formatTime(this.fastestSpacetime);
            }
        }
    };
</script>

<template>
    <div id="spacetime-statistics">
        <h3>Spacetime</h3>
        You have collapsed the spacetime {{ spacetimeAmount }} times 
        <span v-if="hasAtomic">this atomic</span>
        <br>
        You have spent {{ formattedTimeInCurrentSpacetime }} in this spacetime reset
        <br>
        Your fastest spacetime <span v-if="hasAtomic">this atomic</span> 
        took {{ formattedFastestSpacetime }}
        <br>
        Your highest spacetime points per minute <span v-if="hasAtomic">this atomic</span>
        is {{ format(highestSPPerMin) }}
    </div>
</template>

<style scoped>
    #spacetime-statistics {
        text-align: center;
    }
</style>
