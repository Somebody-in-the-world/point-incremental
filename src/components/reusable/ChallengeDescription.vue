<script>
    import EffectDisplay from "./EffectDisplay.vue";
    import { Challenge } from "@/game/challenge";

    export default {
        name: "ChallengeDescription",
        props: {
            challenge: { type: Challenge, required: true },
            currency: { type: String, required: true },
            challType: { type: String, required: true }
        },
        components: {
            EffectDisplay
        },
        data(){
            return {
                challId: 0,
                description: "",
                goal: new Decimal(),
                reward: "",
                hasEffect: false,
                effect: null,
            };
        },
        methods: {
            update(){
                this.challId = this.challenge.id;
                this.description = this.challenge.desc;
                this.goal = this.challenge.goal;
                this.reward = this.challenge.reward;
                this.hasEffect = this.challenge.effectObject != null;
            }
        }
    };
</script>

<template>
    <h3>{{ challType }} Challenge {{ challId }}</h3>
    {{ description }}
    <br>
    Goal: {{ format(goal) }} {{ currency }}
    <br>
    Reward: {{ reward }}
    <span v-if="hasEffect">
        <br>Currently: <EffectDisplay :purchasable="challenge" />
    </span>
</template>
