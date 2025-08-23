<script>
    import { calcAtomicReq, calcParticleGain, calcNextParticleReq, 
        canAtomic, atomicPrestige } from "@/game/atomic";

    export default {
        name: "AtomicButton",
        data(){
            return {
                atomicReq: new Decimal("1e1000"),
                particleGain: new Decimal(),
                nextParticleReq: new Decimal(),
                canAtomic: false
            }
        },
        methods: {
            update(){
                this.atomicReq = calcAtomicReq();
                this.particleGain = calcParticleGain();
                this.nextParticleReq = calcNextParticleReq();
                this.canAtomic = canAtomic();
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
            Go atomic.<br>
            Gain {{ format(particleGain) }} particles 
            (Next particle gained on {{ format(nextParticleReq) }} SP)
        </span>
    </button>
</template>

<style scoped>
    #atomic-button {
        width: 100%;
        height: 12.5vh;
    }
</style>
