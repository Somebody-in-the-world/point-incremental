<script>
    import { changeTab, currentTab, tabNames, tabUnlocked } from "@/game/tabs.js";

    export default {
        name: "TabButton",
        props: {
            tabId: {type: Number, required: true}
        },
        data(){
            return {
                isCurrentTab: false,
                shown: false,
                tabName: tabNames[this.tabId]
            };
        },
        methods: {
            update(){
                this.isCurrentTab = this.tabId == currentTab;
                this.shown = tabUnlocked[this.tabId];
            },
            changeTab
        }
    };
</script>

<template>
    <button @click="changeTab(tabId)" v-show="shown" :disabled="isCurrentTab">{{ tabName }}</button>
</template>
