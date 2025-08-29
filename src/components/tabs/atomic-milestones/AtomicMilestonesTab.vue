<script>
    import Milestone from "@/components/reusable/Milestone.vue";
    import { atomicMilestones } from "@/game/atomic";

    export default {
        name: "AtomicMilestonesTab",
        components: { Milestone },
        data(){
            return {
                atomicMilestones
            };
        }
    };
</script>

<template>
    <h4>Note: Atomic milestones do not have to be done in ascending order, 
        though later ones are generally harder to unlock than previous ones</h4>
    <Milestone v-for="(milestone, idx) in atomicMilestones" :milestoneObject="milestone" :key="idx" />
</template>
