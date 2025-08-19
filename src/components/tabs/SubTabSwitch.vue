<script>
    import { currentTab, subTabNames } from "@/game/tabs.js";
    import SubTabButton from "./SubTabButton.vue";

    export default {
        name: "SubTabSwitch",
        components: {
            SubTabButton
        },
        data(){
            return {
                currentTabSubTabNames: [],
                hidden: false,
                currentTab: 0
            }
        },
        methods: {
            update(){
                this.currentTab = currentTab;
                this.currentTabSubTabNames = subTabNames[currentTab];
            }
        }
    };
</script>

<template>
    <SubTabButton v-for="(name, id) in currentTabSubTabNames" :key="id" :tabId="currentTab" :subTabId="id" :hidden="hidden" />
</template>

