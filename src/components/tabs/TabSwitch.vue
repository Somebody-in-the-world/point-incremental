<script>
    import { tabNames, tabClassStyles } from "@/game/tabs.js";
    import TabButton from "./TabButton.vue";

    export default {
        name: "TabSwitch",
        components: {
            TabButton
        },
        data(){
            return {
                tabNames,
                tabClassStyles,
                hidden: false
            }
        }
    };
</script>

<template>
    <TabButton v-for="(name, id) in tabNames" :key="id" :tabId="id" :hidden="hidden" :class="tabClassStyles[id]" />
</template>
