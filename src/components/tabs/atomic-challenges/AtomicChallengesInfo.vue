<script>
    import { atomicChallengeRequirements, 
        calcUnlockedAtomicChalls } from "@/game/atomic-challenges";

    export default {
        name: "AtomicChallengesInfo",
        data(){
            return {
                currentAtomicChallenge: 0,
                allChallsUnlocked: false,
                nextAtomicChallReq: 0
            }
        },
        methods: {
            update(){
                this.currentAtomicChallenge = player.currentAtomicChallenge;
                this.allChallsUnlocked = calcUnlockedAtomicChalls() == atomicChallengeRequirements.length;
                if(!this.allChallsUnlocked){
                    this.nextAtomicChallReq = atomicChallengeRequirements[calcUnlockedAtomicChalls()];
                }
            }
        }
    };
</script>

<template>
    <h3>You are currently 
        <span v-show="currentAtomicChallenge > 0">in atomic challenge {{ currentAtomicChallenge }}</span>
        <span v-show="currentAtomicChallenge == 0">not in an atomic challenge</span>
        <span v-if="!allChallsUnlocked"><br>
            Next atomic challenge unlocks at {{ nextAtomicChallReq }} total quarks
        </span>
    </h3>
    <h5>
        Atomic challenges can be completed a fractional amount past 1 (5 completions max), but more completions require more SP
        <br>
        Atomic challenges cost a certain amount of quarks to enter, however, they are fully returned on completion or exit
    </h5>
</template>
