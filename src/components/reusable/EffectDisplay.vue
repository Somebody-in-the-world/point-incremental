<script>
    import { Purchasable } from "@/game/purchasable";

    export default {
        name: "EffectDisplay",
        props: {
            purchasable: { type: Purchasable, required: true },
        },
        data(){
            return {
                effect: new Decimal(),
                type: this.purchasable.effectObject.type
            }
        },
        methods: {
            update(){
                this.effect = this.purchasable.effect;
            }
        }
    };
</script>

<template v-if="effect">
    <span v-if="type == 'percentage'">{{ format(effect.mul(100)) }}%</span>
    <span v-if="type == 'add'">+{{ format(effect) }}</span>
    <span v-if="type == 'sub'">-{{ format(effect) }}</span>
    <span v-if="type == 'mult'">x{{ format(effect) }}</span>
    <span v-if="type == 'div'">/ {{ format(effect) }}</span>
    <span v-if="type == 'power'">^{{ format(effect) }}</span>
</template>
