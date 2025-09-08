<script>
    import ChallengeDescription from "@/components/reusable/ChallengeDescription.vue";
    import { Challenge } from "@/game/challenge";

    export default {
        name: "AtomicChallenge",
        props: {
            challenge: { type: Challenge, required: true }
        },
        components: {
            ChallengeDescription
        },
        data(){
            return {
                completions: 0,
                cost: 0,
                canStart: false,
                buttonText: "",
                unlocked: false
            };
        },
        methods: {
            update(){
                this.completions = this.challenge.completions;
                this.cost = this.challenge.cost;
                this.canStart = this.challenge.canStart || this.challenge.isRunning;
                if(this.canStart){
                    this.buttonText = this.challenge.isRunning ? (
                        this.challenge.canComplete ? "Complete Challenge" : "Exit Challenge"
                    ) : "Enter Challenge"
                } else {
                    this.buttonText = "Locked";
                }
                this.unlocked = this.challenge.unlocked;
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
    <div id="challenge" v-if="unlocked">
        <ChallengeDescription :challenge="challenge" challType="Atomic" currency="spacetime points" /><br>
        Cost: {{ cost }} quarks
        <h4>{{ completions.toFixed(3) }} completions</h4>
        <button @click="buttonAction" class="atomic" :disabled="!canStart">{{ buttonText }}</button>
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
        border-color: #60a0ff;
        color: #60a0ff;
        background-color: #183060; 
    }
</style>
