<script>
    import { canTearSpacetime } from "@/game/tear-spacetime";

    export default {
        name: "TearSpacetimeButton",
        data(){
            return {
                canTearSpacetime: false,
                spacetimeTore: false
            };
        },
        methods: {
            update(){
                this.canTearSpacetime = canTearSpacetime();
                this.spacetimeTore = player.spacetimeTore;
            },
            tearSpacetime(){
                player.spacetimeTore = true;
            }
        }
    }
</script>

<template>
    <h4 v-if="(!canTearSpacetime) && (!spacetimeTore)">You must have 1000 spacetime 
        points in order to tear spacetime</h4>
    <button class="spacetime" id="tear-spacetime-button" 
        v-if="canTearSpacetime || spacetimeTore" :disabled="spacetimeTore" @click="tearSpacetime">
        {{ spacetimeTore ? "Spacetime Tore" : "Tear Spacetime" }} 
    </button>
</template>

<style scoped>
    #tear-spacetime-button {
        border: 3px solid;
        width: 100%;
        height: 15vh;
        font-size: 2em;
    }
</style>
