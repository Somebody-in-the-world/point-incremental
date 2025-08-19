<script>
    import { unlockPointReq } from "@/game/challenges";

    export default {
        name: "ChallengesInfo",
        data(){
            return {
                currentChallenge: 0,
                nextChallengeUnlockReq: new Decimal()
            }
        },
        methods: {
            update(){
                this.currentChallenge = player.currentChallenge;
                this.nextChallengeUnlockReq = unlockPointReq[player.latestUnlockedChallenge];
            }
        }
    };
</script>

<template>
    <h3>You are currently 
        <span v-show="currentChallenge > 0">in challenge {{ currentChallenge }}</span>
        <span v-show="currentChallenge == 0">not in a challenge</span>
        <br>
        Next challenge unlocks at {{ format(nextChallengeUnlockReq) }} points</h3>
</template>
