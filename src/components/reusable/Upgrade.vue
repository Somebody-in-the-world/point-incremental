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
                hasEffect: this.purchasable.effectObject,
                capped: false
            };
        },
        methods: {
            update(){
                this.cost = this.purchasable.cost;
                this.description = this.purchasable.description;
                this.capped = this.purchasable.reachedCap;
            }
        }
    };
</script>

<template>
    <PurchasableComponent :purchasable="purchasable">
        {{ description }}
        <br>
        <slot />
        <span v-if="hasEffect">
            Currently: <EffectDisplay :purchasable="purchasable" />
            <br>
            <span v-if="(!capped) && purchasable.repeatable">
                Next: <EffectDisplay :purchasable="purchasable" isNext />
                <br>
            </span>
        </span>
        <span v-if="!capped">Cost: {{ format(cost) }} {{ currency }}</span>
    </PurchasableComponent>
</template>
