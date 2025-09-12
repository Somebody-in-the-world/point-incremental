<script>
    import { quarkPurchasable } from "@/game/quantum";
    import Purchasable from "@/components/reusable/Purchasable.vue";

    export default {
        name: "QuarkDisplay",
        data(){
            return {
                quarks: 0, 
                totalQuarks: 0,
                quarkPurchasable,
                quarkCost: new Decimal()
            };
        },
        components: {
            Purchasable
        },
        methods: {
            update(){
                this.quarks = player.quarks;
                this.totalQuarks = player.totalQuarks;
                this.quarkCost = this.quarkPurchasable.cost;
            }
        }
    };
</script>

<template>
    <h4 style="text-align: center;">
        Quarks are limited resources that costs more and more quantum foam to buy, 
        you can respec upgrades to get all quarks back, though it will force an atomic reset
    </h4>
    <h3 style="text-align: center;">You have <span class="quarks">{{ quarks }}</span> quarks 
        (<span class="quarks">{{ totalQuarks }}</span> quarks total)</h3>
    <Purchasable :purchasable="quarkPurchasable" class="atomic" id="quark-button" >
        Condense your quantum foam into a quark
        <br>
        Cost: {{ format(quarkCost) }} quantum foam
    </Purchasable>
</template>

<style scoped>
    .quarks {
        font-size: 1.25em;
        color: red;
        text-shadow: 0px 2px 5px;
    }

    #quark-button {
        width: 100%;
        padding: 10px 0;
    }
</style>
