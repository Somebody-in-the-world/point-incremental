<script>
    import DarkMatterDisplay from "./DarkMatterDisplay.vue";
    import DarkGeneratorDisplay from "./DarkGeneratorDisplay.vue";
    import { darkGenerators, bulkBuyDarkGenerator } from "@/game/dark-matter";

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
            },
            maxAllDarkGenerators(){
                for(let i = 0; i < player.darkGeneratorsUnlocked; i++){
                    bulkBuyDarkGenerator(i);
                }
            }
        }
    };
</script>

<template>
    <DarkMatterDisplay />
    <div id="generator-container">
        <button class="spacetime" style="padding: 10px; 0" @click="maxAllDarkGenerators">Max all dark generators</button>
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
