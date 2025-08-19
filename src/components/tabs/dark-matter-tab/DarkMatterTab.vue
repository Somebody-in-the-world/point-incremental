<script>
    import DarkMatterDisplay from "./DarkMatterDisplay.vue";
    import DarkGeneratorDisplay from "./DarkGeneratorDisplay.vue";
    import { darkGenerators } from "@/game/dark-matter";

    export default {
        name: "DarkMatterTab",
        components: {
            DarkMatterDisplay,
            DarkGeneratorDisplay
        },
        data(){
            return {
                darkGenerators,
                darkGeneratorsUnlocked: 0
            };
        },
        methods: {
            update(){
                this.darkGeneratorsUnlocked = player.darkGeneratorsUnlocked;
            }
        }
    };
</script>

<template>
    <DarkMatterDisplay />
    <div id="generator-container">
        <DarkGeneratorDisplay v-for="(generator, idx) in darkGenerators" 
            :darkGenerator="generator" :tier="idx+1" :key="idx" :hidden="(idx+1) > darkGeneratorsUnlocked" />
    </div>
</template>

<style scoped>
    #generator-container {
        display: grid;
        grid-template-columns: auto;
    }
</style>
