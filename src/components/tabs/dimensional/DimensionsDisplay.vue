<script>
    import Dimension from "@/components/reusable/Dimension.vue";
    import { dimensions, calcDimensionCaps } from "@/game/dimensional";

    export default {
        name: "DimensionsDisplay",
        components: {
            Dimension
        },
        data(){
            return {
                dimensions,
                shownDims: Array(8).fill(true),
                dimensionCaps: 0,
                showDimCapTip: false
            };
        },
        methods: {
            update(){
                for(let i = 1; i < 8; i++){
                    this.shownDims[i] = dimensions[i-1].boughtAmount > 0 || player.records.spacetimeAmount > 0;
                }
                this.showDimCapTip = player.records.atomicAmount > 0
                if(this.showDimCapTip) this.dimensionCaps = calcDimensionCaps();
            }
        }
    };
</script>
 
<template>
    <h4 v-if="showDimCapTip">All dimensions except the 8th are limited to {{ formatInt(dimensionCaps) }} purchases each</h4>
    <Dimension :dimension="dim" :key="idx" v-for="(dim, idx) in dimensions" v-show="shownDims[idx]">
        Dimension {{ idx + 1 }}
    </Dimension>
</template>
