<script>
    import { Purchasable } from "@/game/purchasable";

    export default {
        name: "Purchasable",
        props: {
            purchasable: {type: Purchasable, required: true},
        },
        data(){
            return {
                canBuy: false,
                unlocked: false,
                purchased: false
            };
        },
        methods: {
            update(){
                this.canBuy = this.purchasable.canBuy;
                this.unlocked = this.purchasable.unlocked;
                this.purchased = this.purchasable.repeatable ?
                    this.purchasable.reachedCap : this.purchasable.boughtAmount;
            },
            buy(){
                this.purchasable.buy();
            }
        }
    };
</script>

<template>
    <button :disabled="!canBuy" @click="buy" v-show="unlocked" :class="{ purchased: purchased }">
        <slot></slot>
    </button>
</template>
