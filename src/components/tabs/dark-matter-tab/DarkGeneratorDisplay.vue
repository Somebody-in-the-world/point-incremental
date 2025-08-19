<script>
    import PurchasableComponent from "@/components/reusable/Purchasable.vue";
    import { Purchasable } from "@/game/purchasable";

    export default {
        name: "DarkGeneratorDisplay",
        components: {
            PurchasableComponent
        },
        props: {
            darkGenerator: { type: Purchasable, required: true },
            tier: { type: Number, required: true }
        },
        data(){
            return {
                generatorBoughtAmount: 0,
                generatorCost: new Decimal(),
                generatorEffect: new Decimal()
            };
        },
        methods: {
            update(){
                this.generatorBoughtAmount = this.darkGenerator.boughtAmount;
                this.generatorCost = this.darkGenerator.cost;
                this.generatorEffect = this.darkGenerator.effect;
            }
        }
    };
</script>

<template>
    <PurchasableComponent class="spacetime generators" :purchasable="darkGenerator">
        Tier {{ tier }} Dark Generator ({{ generatorBoughtAmount }})
        <br>
        <span v-if="tier == 1">
            Generating {{ format(generatorEffect) }} dark matter per second
        </span>
        <span v-if="tier != 1">
            Multiplying tier {{ tier - 1 }} dark generators by {{ format(generatorEffect) }}x
        </span>
        <br>
        Cost: {{ format(generatorCost) }} SP
    </PurchasableComponent>
</template>

<style scoped>
    .generators {
        padding: 10px 0;
        border: 2px solid;
        margin: 2px 0;
    }
</style>

