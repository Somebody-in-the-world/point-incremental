<script>
    import Challenge from "@/components/reusable/Challenge.vue";
    import { challenges } from "@/game/challenges";

    export default {
        name: "ChallengesList",
        components: { Challenge },
        data(){
            return {
                challenges,
                latestUnlockedChallenge: 0
            };
        },
        methods: {
            update(){
                this.latestUnlockedChallenge = player.latestUnlockedChallenge;
            }
        }
    };
</script>

<template>
    <Challenge v-for="(chall, idx) in challenges" :challenge="chall" :key="idx" :hidden="idx+1 > latestUnlockedChallenge"/>
</template>
