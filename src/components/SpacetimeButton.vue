<script>
    import { spacetimePrestige } from "@/game/spacetime";
    export default {
        name: "SpacetimeButton",
        methods: {
            spacetime(){
                Events.UI.dispatch(GAME_EVENTS.SPACETIME_ANIM);
                spacetimePrestige();
            }
        }
    };
</script>

<template>
    <h3 id="collapse-message">
        The spacetime cannot hold this much points; 
        thus, you must collapse the spacetime in order to progress farther
    </h3>
    <div id="collapse-button-container">
        <button id="collapse-button" class="spacetime" @click="spacetime">Collapse Spacetime</button>
    </div>
    <br>
</template>

<style scoped>
    #collapse-button-container {
        width: 80%;
        margin: auto;
    }

    #collapse-message {
        text-align: center;
    }

    #collapse-button {
        width: 100%;
        height: 20vh;
        border-style: solid;
        border-width: 2px;
        border-radius: 2px;
        font-size: 2.5em;
    }

</style>
