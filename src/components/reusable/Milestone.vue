<script>
    import { Milestone } from "@/game/milestone";
    export default {
        name: "Milestone",
        props: {
            milestoneObject: { type: Milestone, required: true }
        },
        data(){
            return {
                unlockDescription: this.milestoneObject.unlockDescription,
                rewardDescription: this.milestoneObject.rewardDescription,
                unlocked: false
            };
        },
        methods: {
            update(){
                this.unlocked = this.milestoneObject.unlocked;
            }
        }
    };
</script>

<template>
    <div id="milestone" :class="{ 'milestone-unlocked': unlocked }">
        {{ unlockDescription }}
        <br>
        {{ rewardDescription }}
    </div>
</template>

<style scoped>
    #milestone {
        width: 100%;
        height: fit-content;
        border: 1px solid;
        border-radius: 2px;
        text-align: center;
        padding: 10px 0px;
        background-color: var(--milestone-locked-color);
    }

    .milestone-unlocked {
        background-color: var(--milestone-color) !important;
    }
</style>
