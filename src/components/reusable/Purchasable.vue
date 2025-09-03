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
                unlocked: false
            };
        },
        methods: {
            update(){
                this.canBuy = this.purchasable.canBuy;
                this.unlocked = this.purchasable.unlocked;
            },
            buy(){
                this.purchasable.buy();
            }
        }
    };
</script>

<template>
    <button :disabled="!canBuy" @click="buy" v-show="unlocked">
        <slot></slot>
    </button>
</template>
