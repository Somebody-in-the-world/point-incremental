<script>
    import { changeSubTab, currentTab, currentSubTab, subTabNames, subTabUnlockFuncs } from "@/game/tabs.js";

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
                subTabName: ""
            };
        },
        methods: {
            update(){
                this.isCurrentSubTab = this.tabId == currentTab && this.subTabId == currentSubTab;
                // no idea why
                try {
                    this.subTabName = subTabNames[this.tabId][this.subTabId];
                    this.shown = subTabUnlockFuncs[this.tabId][this.subTabId]();
                } catch {}
            },
            changeSubTab
        }
    };
</script>

<template>
    <button @click="changeSubTab(subTabId)" v-show="shown" :disabled="isCurrentSubTab">{{ subTabName }}</button>
</template>

