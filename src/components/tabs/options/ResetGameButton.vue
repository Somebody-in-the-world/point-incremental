<script>
    import { saveKey, toggleSave } from "@/game/saving";

    export default {
        name: "ResetGameButton",
        methods: {
            resetGame(){
                if(!window.confirm("Are you sure you want to reset the game? All your progress will be lost!")) return;
                if(!window.confirm("Are you REALLY sure you want to reset the game? You will gain NOTHING in return!")) return;
                if(!(window.prompt("Fine. Enter \"I really want to reset the game.\" to reset the game")
                    == "I really want to reset the game.")) return;
                if(!window.confirm("Do you REALLY want to RESET the game, there is NO return. This is the last confirmation!")) return;

                toggleSave(false);
                localStorage.removeItem(saveKey);
                location.reload();
            }
        }
    };
</script>

<template>
    <button id="reset-game" @click="resetGame">RESET THE GAME</button>
</template>

<style scoped>
    #reset-game {
        background-color: red;
        color: white;
        border: 2px solid black;
        border-radius: 0;
    }
</style>
