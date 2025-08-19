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
                dimCost: new Decimal()
            };
        },
        methods: {
            update(){
                this.dimBoughtAmount = this.dimension.boughtAmount;
                this.dimAmount = this.dimension.totalAmount;
                this.dimCost = this.dimension.cost;
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
                Cost: {{ format(dimCost) }} DP
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
