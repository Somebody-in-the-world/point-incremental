<script>
    import { unlockPointReq } from "@/game/challenges";

    export default {
        name: "ChallengesInfo",
        data(){
            return {
                currentChallenge: 0,
                nextChallengeUnlockReq: new Decimal(),
                unlockedAllChallenges: false
            }
        },
        methods: {
            update(){
                this.currentChallenge = player.currentChallenge;
                this.unlockedAllChallenges = player.latestUnlockedChallenge == unlockPointReq.length;
                if(!this.unlockedAllChallenges){
                    this.nextChallengeUnlockReq = unlockPointReq[player.latestUnlockedChallenge];
                }
            }
        }
    };
</script>

<template>
    <h3>You are currently 
        <span v-show="currentChallenge > 0">in challenge {{ currentChallenge }}</span>
        <span v-show="currentChallenge == 0">not in a challenge</span>
        <br>
        <span v-if="!unlockedAllChallenges">
            Next challenge unlocks at {{ format(nextChallengeUnlockReq) }} points
        </span>
    </h3>
</template>
