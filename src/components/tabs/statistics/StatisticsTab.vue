<script>
    import GeneralStatistics from "./GeneralStatistics.vue";
    import SpacetimeStatistics from "./SpacetimeStatistics.vue";
    import AtomicStatistics from "./AtomicStatistics.vue";

    export default {
        name: "StatisticsTab",
        components: {
            GeneralStatistics,
            SpacetimeStatistics,
            AtomicStatistics
        },
        data(){
            return {
                hasSpacetimed: false,
                hasAtomic: false
            };
        },
        methods: {
            update(){
                this.hasSpacetimed = player.records.totalSpacetimeAmount > 0;
                this.hasAtomic = player.records.atomicAmount > 0;
            }
        }
    };
</script>

<template>
    <GeneralStatistics />
    <SpacetimeStatistics v-if="hasSpacetimed" />
    <AtomicStatistics v-if="hasAtomic" />
</template>
