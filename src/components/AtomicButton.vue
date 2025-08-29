<script>
    import { calcAtomicReq, calcParticleGain, calcNextParticleReq, 
        calcParticlesPerMinute,
        canAtomic, atomicPrestige } from "@/game/atomic";

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
                canAtomic: false,
                showNextInfo: false
            }
        },
        methods: {
            update(){
                this.atomicReq = calcAtomicReq();
                this.particleGain = calcParticleGain();
                this.canAtomic = canAtomic();
                this.showNextInfo = this.particleGain.lt(1e3);
                if(this.showNextInfo){
                    this.nextParticleReq = calcNextParticleReq();
                } else {
                    this.particlesPerMinute = calcParticlesPerMinute();
                    this.peakParticlesPerMin = player.peakParticlesPerMin;
                    this.particlesAtPeakParticlesPerMin = player.particlesAtPeakParticlesPerMin;
                }
            },
            atomic(){
                if(!window.confirm("Are you sure you want to go atomic? It will take time to get back here!")) return;
                atomicPrestige();
            }
        }
    };
</script>

<template>
    <button class="atomic" id="atomic-button" :disabled="!canAtomic" @click="atomic">
        <span v-if="!canAtomic">
            Reach {{ format(atomicReq) }} spacetime points to atomic
        </span>
        <span v-if="canAtomic">
            <div v-if="showNextInfo">Go atomic.<br></div>
            {{ showNextInfo ? "Gain" : "Go atomic to gain" }} {{ format(particleGain) }} particles 
            <span v-if="showNextInfo">
                (Next particle gained on {{ format(nextParticleReq) }} SP)
            </span>
            <br>
            <span style="font-size: 0.65em;" v-if="!showNextInfo">
                ({{ format(particlesPerMinute) }} particles/min, 
                Peak: {{ format(peakParticlesPerMin) }}/min at {{ format(particlesAtPeakParticlesPerMin) }} particles)
            </span>
        </span>
    </button>
</template>

<style scoped>
    #atomic-button {
        width: 100%;
        height: 12.5vh;
    }
</style>
