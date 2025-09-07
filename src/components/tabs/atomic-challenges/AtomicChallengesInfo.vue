<script>
    export default {
        name: "AtomicChallengesInfo",
        data(){
            return {
                currentAtomicChallenge: 0
            }
        },
        methods: {
            update(){
                this.currentAtomicChallenge = player.currentAtomicChallenge;
            }
        }
    };
</script>

<template>
    <h3>You are currently 
        <span v-show="currentAtomicChallenge > 0">in atomic challenge {{ currentAtomicChallenge }}</span>
        <span v-show="currentAtomicChallenge == 0">not in an atomic challenge</span>
    </h3>
</template>
