<script>
    import AutomationPointsUnlock from "./AutomationPointsUnlock.vue";
    import AutomationPointsDisplay from "./AutomationPointsDisplay.vue";
    import AutomationPointsSacrifice from "./AutomationPointsSacrifice.vue";

    export default {
        name: "AutomationPointsComponent",
        data(){
            return {
                shown: false,
                unlocked: false
            };
        },
        components: {
            AutomationPointsUnlock,
            AutomationPointsDisplay,
            AutomationPointsSacrifice
        },
        methods: {
            update(){
                this.shown = player.records.pointCompressionAmount > 0;
                this.unlocked = player.automationPointsUnlocked;
            }
        }
    };
</script>

<template>
    <div v-if="shown">
        <hr>
        <AutomationPointsUnlock />
        <div v-if="unlocked">
            <AutomationPointsDisplay />
            <AutomationPointsSacrifice />
        </div>
    </div>
</template>
