<script>
    import ChallengeDescription from "@/components/reusable/ChallengeDescription.vue";
    import { Challenge } from "@/game/challenge";

    export default {
        name: "SpacetimeChallenge",
        props: {
            challenge: { type: Challenge, required: true }
        },
        components: {
            ChallengeDescription
        },
        data(){
            return {
                completed: false,
                buttonText: ""
            };
        },
        methods: {
            update(){
                this.completed = this.challenge.completed;
                this.buttonText = this.challenge.isRunning ? (
                    this.challenge.canComplete ? "Complete Challenge" : "Exit Challenge"
                ) : "Enter Challenge"
            },
            buttonAction(){
                if(this.challenge.isRunning){
                    if(this.challenge.canComplete) this.challenge.complete();
                    else this.challenge.exit();
                } else {
                    this.challenge.start();
                }
            }
        }
    };
</script>

<template>
    <div id="challenge">
        <ChallengeDescription :challenge="challenge" challType="Spacetime" currency="points" />
        <h4>{{ completed ? "Completed" : "Not Completed" }}</h4>
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
