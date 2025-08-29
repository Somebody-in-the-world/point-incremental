<script>
    import { autobuyers } from "@/game/autobuyers";
    import AutobuyerSettings from "./AutobuyerSettings.vue";
    export default {
        name: "AutobuyersTab",
        components: {
            AutobuyerSettings
        },
        data(){
            return {
                autobuyers
            };
        }
    };
</script>

<template>
    <div id="autobuyers-container">
        <AutobuyerSettings v-for="(_, idx) in autobuyers" 
        :autobuyerObject="autobuyers[idx]" :key="idx" v-show="autobuyers[idx].unlocked" />
    </div>
</template>

<style scoped>
    #autobuyers-container {
        display: grid;
        grid-template-columns: 50% 50%;
        width: 100%;
    }
</style>
