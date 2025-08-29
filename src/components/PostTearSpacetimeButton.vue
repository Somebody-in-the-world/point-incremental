<script>
    import { calcSpacetimePointsGain, canSpacetime, 
        spacetimePrestige, calcSpacetimePointsPerMinute,
        calcSpacetimeReq
    } 
    from "@/game/spacetime";
    import { INFINITY } from "@/game/constants";

    export default {
        name: "PostTearSpacetimeButton",
        data(){
            return {
                spacetimePointsGain: new Decimal(),
                canSpacetime: false,
                spacetimePointsPerMinute: new Decimal(),
                peakSPPerMin: new Decimal(),
                SPAtPeakSPPerMin: new Decimal(),
                spacetimeReq: INFINITY,
                inChallenge: false,
                showPeakInfo: true
            }
        },
        methods: {
            update(){
                this.spacetimePointsGain = calcSpacetimePointsGain();
                this.showPeakInfo = this.spacetimePointsGain.lt(1e50);
                if(this.showPeakInfo){
                    this.spacetimePointsPerMinute = calcSpacetimePointsPerMinute();
                    this.peakSPPerMin = player.peakSPPerMin;
                    this.SPAtPeakSPPerMin = player.SPAtPeakSPPerMin;
                }
                this.canSpacetime = canSpacetime();
                this.spacetimeReq = calcSpacetimeReq();
                this.inChallenge = player.currentChallenge != 0;
            },
            spacetimePrestige
        }
    };
</script>

<template>
    <button class="spacetime-alt" id="spacetime-button" :disabled="!canSpacetime" @click="spacetimePrestige">
        <span :hidden="!canSpacetime">
            Spacetime to 
            <span :hidden="inChallenge">
                gain {{ format(spacetimePointsGain) }} spacetime points
                <br>
                <span style="font-size: 0.65em;" v-if="showPeakInfo">
                    ({{ format(spacetimePointsPerMinute) }} SP/min, 
                    Peak: {{ format(peakSPPerMin) }} SP/min at {{ format(SPAtPeakSPPerMin) }} SP)
                </span>
            </span>
            <span :hidden="!inChallenge">
                complete challenge
            </span>
        </span>
        <span :hidden="canSpacetime">
            Reach {{ format(spacetimeReq) }} points to {{ inChallenge ? "complete challenge" : "spacetime" }}
        </span>
    </button>
</template>

<style scoped>
    #spacetime-button {
        width: 100%;
        height: 12.5vh;
    }
</style>
