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
    <div id="challenge-grid">
        <Challenge v-for="(chall, idx) in challenges" :challenge="chall" :key="idx" :hidden="idx+1 > latestUnlockedChallenge" />
    </div>
</template>

<style scoped>
    #challenge-grid {
        display: grid;
        grid-template-columns: 50% 50%;
    }

    @media (max-width: 768px) {
        #challenge-grid > * {
            font-size: 2.5vmin;
        }
    }
</style>
