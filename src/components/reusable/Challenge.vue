<script>
    import { Challenge } from "@/game/challenge";

    export default {
        name: "Challenge",
        props: {
            challenge: {type: Challenge, required: true}
        },
        data(){
            return {
                challId: 0,
                description: "",
                goal: new Decimal(),
                reward: "",
                buttonText: "",
                completed: false
            };
        },
        methods: {
            update(){
                this.challId = this.challenge.id;
                this.description = this.challenge.desc;
                this.goal = this.challenge.goal;
                this.reward = this.challenge.reward;
                this.buttonText = 
                    this.challenge.isRunning ? 
                        (this.challenge.canComplete ? "Finish challenge" : "Exit challenge")
                        : "Enter challenge";
                if(!this.challenge.isRunning){
                    this.buttonText = `${this.buttonText} (${this.completed ? "Completed" : "Not completed"})`;
                }
                this.completed = this.challenge.completed;
            },
            buttonAction(){
                if(this.challenge.isRunning){
                    if(this.challenge.canComplete) this.challenge.complete();
                    else this.challenge.exit();
                } else this.challenge.start();
            }
        }
    };
</script>

<template>
    <div id="challenge">
        <h3>Challenge {{ challId }}</h3>
        {{ description }}
        <br>
        Goal: {{ format(goal) }} points
        <br>
        Reward: {{ reward }}
        <br>
        <br>
        <button @click="buttonAction">{{ buttonText }}</button>
    </div>
</template>

<style scoped>
    #challenge {
        width: 100%;
        border-style: solid;
        border-width: 2px;
        border-radius: 5px;
        text-align: center;
        padding: 5px 10px;
    }
</style>
