<script>
    import Milestone from "@/components/reusable/Milestone.vue";
    import { spacetimeMilestones } from "@/game/spacetime";
    export default {
        name: "SpacetimeMilestonesTab",
        components: { Milestone },
        data(){
            return {
                spacetimeMilestones,
                spacetimeAmount: 0
            };
        },
        methods: {
            update(){
                this.spacetimeAmount = player.records.spacetimeAmount;
            }
        }
    };
</script>

<template>
    <h4>You have collapsed the spacetime {{ spacetimeAmount }} times</h4>
    <Milestone v-for="(_, idx) in spacetimeMilestones" :milestoneObject="spacetimeMilestones[idx]" :key="idx" />
</template>
