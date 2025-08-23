<script>
    import { Dimension } from "@/game/dimension";
    import EffectDisplay from "./EffectDisplay.vue";
    import Purchasable from "./Purchasable.vue";

    export default {
        name: "Dimension",
        props: {
            dimension: {type: Dimension, required: true}
        },
        components: {
            Purchasable,
            EffectDisplay
        },
        data(){
            return {
                dimAmount: new Decimal(),
                dimBoughtAmount: 0,
                dimCost: new Decimal(),
                capped: false
            };
        },
        methods: {
            update(){
                this.dimBoughtAmount = this.dimension.boughtAmount;
                this.dimAmount = this.dimension.totalAmount;
                this.dimCost = this.dimension.cost;
                this.capped = this.dimension.reachedCap;
            }
        }
    };
</script>

<template>
    <div id="dimension">
        <div>
            <slot></slot> <EffectDisplay :purchasable="dimension" />
        </div>
        <div>{{ format(dimAmount) }}</div>
        <div>
            <Purchasable :purchasable="dimension">
                <span v-if="!capped">Cost: {{ format(dimCost) }} DP</span>
                <span v-if="capped">Capped</span>
            </Purchasable>
        </div>
    </div>
</template>

<style scoped>
    #dimension {
        display: flex;
        justify-content: space-between;
    }
</style>
