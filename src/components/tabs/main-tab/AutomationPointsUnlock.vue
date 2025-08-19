<script>
    import Purchasable from "@/components/reusable/Purchasable.vue";
    import { automationPointsUnlock } from "@/game/automation-points";

    export default {
        name: "AutomationPointsUnlock",
        data(){
            return {
                automationPointsUnlock,
                unlockReq: automationPointsUnlock.cost,
                hidden: false
            };
        },
        components: {
            Purchasable
        },
        methods: {
            update(){
                this.hidden = player.automationPointsUnlocked;
            }
        }
    };
</script>

<template>
    <Purchasable :purchasable="automationPointsUnlock" v-if="!hidden">
        Unlock automation points<br>
        Requires: {{ format(unlockReq) }} compressed points
    </Purchasable>
</template>
