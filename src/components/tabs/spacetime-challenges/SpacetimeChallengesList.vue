<script>
    import SpacetimeChallenge from "./SpacetimeChallenge.vue";
    import { spacetimeChallenges } from "@/game/spacetime-challenges";

    export default {
        name: "SpacetimeChallengesList",
        components: { SpacetimeChallenge },
        data(){
            return {
                spacetimeChallenges,
                latestUnlockedSpacetimeChallenge: 0
            };
        },
        methods: {
            update(){
                this.latestUnlockedSpacetimeChallenge = player.latestUnlockedChallenge;
            }
        }
    };
</script>

<template>
    <div id="challenge-grid">
        <SpacetimeChallenge v-for="(chall, idx) in spacetimeChallenges" :challenge="chall" :key="idx" 
            :hidden="idx+1 > latestUnlockedSpacetimeChallenge" />
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
