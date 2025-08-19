<script>
    import { Purchasable } from "@/game/purchasable";
    import EffectDisplay from "./EffectDisplay.vue";
    import PurchasableComponent from "./Purchasable.vue";
    export default {
        name: "Upgrade",
        components: {
            PurchasableComponent,
            EffectDisplay
        },
        props: {
            purchasable: { type: Purchasable, required: true },
            currency: { type: String, required: true }
        },
        data(){
            return {
                cost: new Decimal(),
                description: "",
                hasEffect: this.purchasable.effectObject
            };
        },
        methods: {
            update(){
                this.cost = this.purchasable.cost;
                this.description = this.purchasable.description;
            }
        }
    };
</script>

<template>
    <PurchasableComponent :purchasable="purchasable">
        <slot></slot> {{ description }}
        <br>
        <span v-if="hasEffect">
            Currently: <EffectDisplay :purchasable="purchasable" />
            <br>
        </span>
        Cost: {{ format(cost) }} {{ currency }}
    </PurchasableComponent>
</template>
