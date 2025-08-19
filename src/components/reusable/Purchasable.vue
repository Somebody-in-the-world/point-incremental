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
            };
        },
        methods: {
            update(){
                this.canBuy = this.purchasable.canBuy;
            },
            buy(){
                this.purchasable.buy();
            }
        }
    };
</script>

<template>
    <button :disabled="!canBuy" @click="buy">
        <slot></slot>
    </button>
</template>
