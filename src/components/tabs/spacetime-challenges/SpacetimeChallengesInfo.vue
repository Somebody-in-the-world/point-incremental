<script>
    import { unlockPointReq } from "@/game/spacetime-challenges";

    export default {
        name: "SpacetimeChallengesInfo",
        data(){
            return {
                currentSpacetimeChallenge: 0,
                nextSpacetimeChallengeUnlockReq: new Decimal(),
                unlockedAllSpacetimeChallenges: false
            }
        },
        methods: {
            update(){
                this.currentSpacetimeChallenge = player.currentChallenge;
                this.unlockedAllSpacetimeChallenges = player.latestUnlockedChallenge == unlockPointReq.length;
                if(!this.unlockedAllSpacetimeChallenges){
                    this.nextSpacetimeChallengeUnlockReq = unlockPointReq[player.latestUnlockedChallenge];
                }
            }
        }
    };
</script>

<template>
    <h3>You are currently 
        <span v-show="currentSpacetimeChallenge > 0">in spacetime challenge {{ currentSpacetimeChallenge }}</span>
        <span v-show="currentSpacetimeChallenge == 0">not in a spacetime challenge</span>
        <br>
        <span v-if="!unlockedAllSpacetimeChallenges">
            Next spacetime challenge unlocks at {{ format(nextSpacetimeChallengeUnlockReq) }} points
        </span>
    </h3>
</template>
