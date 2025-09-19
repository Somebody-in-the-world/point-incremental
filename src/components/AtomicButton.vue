<script>
    import { calcAtomicReq, calcParticleGain, calcNextParticleReq, 
        calcParticlesPerMinute,
        canAtomic, atomicPrestige } from "@/game/atomic";
    import { atomicChallenges } from "@/game/atomic-challenges";

    export default {
        name: "AtomicButton",
        data(){
            return {
                atomicReq: new Decimal(),
                particleGain: new Decimal(),
                nextParticleReq: new Decimal(),
                particlesPerMinute: new Decimal(),
                peakParticlesPerMinute: new Decimal(),
                particlesAtPeakParticlesPerMin: new Decimal(),
                inAtomicChallenge: false,
                gainedCompletions: 0,
                gainedCompletionsSPThreesold: new Decimal(),
                fullCompletions: false,
                canAtomic: false,
                showNextInfo: false,
                showPeakInfo: false
            }
        },
        methods: {
            update(){
                this.atomicReq = calcAtomicReq();
                this.particleGain = calcParticleGain();
                this.canAtomic = canAtomic();
                this.showNextInfo = this.particleGain.lt(1e3);
                this.showPeakInfo = this.particleGain.lt(1e100);
                this.inAtomicChallenge = player.currentAtomicChallenge > 0;
                if(this.inAtomicChallenge){
                    this.gainedCompletions = atomicChallenges[player.currentAtomicChallenge-1].gainedCompletions;
                    this.gainedCompletionsSPThreesold = 
                        atomicChallenges[player.currentAtomicChallenge-1].goal.pow(
                        atomicChallenges[player.currentAtomicChallenge-1].completions);
                    this.fullCompletions = atomicChallenges[player.currentAtomicChallenge-1].completions >= 5;
                }
                if(this.showNextInfo){
                    this.nextParticleReq = calcNextParticleReq();
                } else {
                    this.particlesPerMinute = calcParticlesPerMinute();
                    this.peakParticlesPerMin = player.peakParticlesPerMin;
                    this.particlesAtPeakParticlesPerMin = player.particlesAtPeakParticlesPerMin;
                }
            },
            atomic(){
                if(player.options.confirmations.atomic){
                    if(!window.confirm("Are you sure you want to go atomic? It will take time to get back here!")) return;
                }
                atomicPrestige();
            }
        }
    };
</script>
<template>
    <button class="atomic" id="atomic-button" :disabled="!canAtomic" @click="atomic">
        <span v-if="!canAtomic">
            Reach {{ format(atomicReq) }} spacetime points to {{ inAtomicChallenge ? "complete challenge" : "atomic" }}
        </span>
        <span v-if="canAtomic && (!inAtomicChallenge)">
            <div v-if="showNextInfo">Go atomic.<br></div>
            {{ showNextInfo ? "Gain" : "Go atomic to gain" }} {{ format(particleGain) }} particles 
            <span v-if="showNextInfo">
                (Next particle gained on {{ format(nextParticleReq) }} SP)
            </span>
            <br>
            <span style="font-size: 0.65em;" v-if="(!showNextInfo) && showPeakInfo">
                ({{ format(particlesPerMinute) }} particles/min, 
                Peak: {{ format(peakParticlesPerMin) }}/min at {{ format(particlesAtPeakParticlesPerMin) }} particles)
            </span>
        </span>
        <span v-if="canAtomic && inAtomicChallenge">
            Go Atomic.<br>
            <span :hidden="(!fullCompletions) || (gainedCompletions>0)">This atomic challenge is already fully completed</span>
            <span :hidden="fullCompletions">Gain {{ gainedCompletions.toFixed(3) }} atomic challenge completions</span>
            <span :hidden="(gainedCompletions>0) || (fullCompletions)">(More completions at {{ format(gainedCompletionsSPThreesold) }} SP)</span>
        </span>
    </button>
</template>

<style scoped>
    #atomic-button {
        width: 100%;
        height: 12.5vh;
    }
</style>
