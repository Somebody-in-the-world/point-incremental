<script>
    import { formatTime } from "@/game/time";

    export default {
        name: "AtomicStatistics",
        data(){
            return {
                atomicAmount: 0,
                timeInCurrentAtomic: 0,
                fastestAtomic: 99999999
            };
        },
        methods: {
            update(){
                this.atomicAmount = player.records.atomicAmount;
                this.timeInCurrentAtomic = player.records.timeInCurrentAtomic;
                this.fastestAtomic = player.records.fastestAtomic;
            }
        },
        computed: {
            formattedTimeInCurrentAtomic(){
                return formatTime(this.timeInCurrentAtomic);
            },
            formattedFastestAtomic(){
                return formatTime(this.fastestAtomic);
            }
        }
    };
</script>

<template>
    <div id="atomic-statistics">
        <h3 id="atomic-statistics-header">Atomic</h3>
        You have gone atomic {{ atomicAmount }} times
        <br>
        You have spent {{ formattedTimeInCurrentAtomic }} in this atomic reset
        <br>
        Your fastest atomic took {{ formattedFastestAtomic }}
    </div>
</template>

<style scoped>
    #atomic-statistics {
        text-align: center;
    }

    #atomic-statistics-header {
        color: #60a0ff;
        text-shadow: 1px 1px 5px;
    }
</style>
