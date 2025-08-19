<script>
    import Dimension from "@/components/reusable/Dimension.vue";
    import { dimensions } from "@/game/dimensional";

    export default {
        name: "DimensionsDisplay",
        components: {
            Dimension
        },
        data(){
            return {
                dimensions,
                shownDims: Array(8).fill(true)
            };
        },
        methods: {
            update(){
                for(let i = 1; i < 8; i++){
                    this.shownDims[i] = dimensions[i-1].boughtAmount > 0 || player.records.spacetimeAmount > 0;
                }
            }
        }
    };
</script>
 
<template>
    <Dimension :dimension="dim" :key="idx" v-for="(dim, idx) in dimensions" v-show="shownDims[idx]">
        Dimension {{ idx + 1 }}
    </Dimension>
</template>
