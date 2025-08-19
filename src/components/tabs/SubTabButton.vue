<script>
    import { changeSubTab, currentTab, currentSubTab, subTabNames } from "@/game/tabs.js";

    export default {
        name: "SubTabButton",
        props: {
            tabId: {type: Number, required: true},
            subTabId: {type: Number, required: true}
        },
        data(){
            return {
                isCurrentSubTab: false,
                shown: true,
                subTabName: subTabNames[this.tabId][this.subTabId]
            };
        },
        methods: {
            update(){
                this.isCurrentSubTab = this.tabId == currentTab && this.subTabId == currentSubTab;
            },
            changeSubTab
        }
    };
</script>

<template>
    <button @click="changeSubTab(subTabId)" v-show="shown" :disabled="isCurrentSubTab">{{ subTabName }}</button>
</template>

