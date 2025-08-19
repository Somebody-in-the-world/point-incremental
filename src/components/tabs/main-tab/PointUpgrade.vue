<script>
    import { pointUpgrade, calcSingleEffect } from "@/game/point-upgrade";
    import Purchasable from "@/components/reusable/Purchasable.vue";
    import PointUpgradeMaxAll from "./PointUpgradeMaxAll.vue";
    import { achievements } from "@/game/achievements";

    export default {
        name: "PointUpgrade",
        data(){
            return {
                upgrade: pointUpgrade,
                singleEffect: new Decimal(),
                cost: new Decimal(),
                shown: false,
                maxAllUnlocked: false
            };
        },
        components: {
            Purchasable,
            PointUpgradeMaxAll
        },
        methods: {
            update(){
                this.cost = this.upgrade.cost;
                this.shown = player.points.gte(10) || 
                    player.pointUpgrade.boughtAmount > 0 || 
                    player.records.pointCompressionAmount > 0;
                this.singleEffect = calcSingleEffect();
                this.maxAllUnlocked = achievements[6].unlocked;
            }
        }
    };
</script>

<template>
    <Purchasable :purchasable="upgrade" v-if="shown">
        get {{ format(singleEffect) }}x more points<br>
        Cost: {{ format(cost) }} points
    </Purchasable>
    <div v-if="maxAllUnlocked">
        <PointUpgradeMaxAll />
    </div>
</template>
