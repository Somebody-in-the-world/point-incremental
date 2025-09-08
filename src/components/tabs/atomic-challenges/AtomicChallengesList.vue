<script>
    import AtomicChallenge from "./AtomicChallenge.vue";
    import { atomicChallenges } from "@/game/atomic-challenges";

    export default {
        name: "AtomicChallengesList",
        components: { AtomicChallenge },
        data(){
            return {
                atomicChallenges
            };
        }
    };
</script>

<template>
    <div id="challenge-grid">
        <AtomicChallenge v-for="(chall, idx) in atomicChallenges" 
            :challenge="chall" :key="idx" class="challenge-box" />
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
