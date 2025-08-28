<script>
    export default {
        name: "AtomicStatistics",
        data(){
            return {
                atomicAmount: 0
            };
        },
        methods: {
            update(){
                this.atomicAmount = player.records.atomicAmount;
            }
        }
    };
</script>

<template>
    <div id="atomic-statistics">
        <h3 id="atomic-statistics-header">Atomic</h3>
        You have gone atomic {{ atomicAmount }} times
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
