<script>
    import Upgrade from "@/components/reusable/Upgrade.vue";
    import { spacetimeUpgrades, spacetimePointMultiplier, bulkBuySPMult } from "@/game/spacetime";
    export default {
        name: "SpacetimeUpgradesTab",
        components: { Upgrade },
        data(){
            return {
                spacetimeUpgrades,
                spacetimePointMultiplier
            };
        },
        methods: {
            bulkBuySPMult
        }
    };
</script>

<template>
    <button class="sp-mult-upgrade" @click="bulkBuySPMult">Max SP Multiplier</button>
    <Upgrade :purchasable="spacetimePointMultiplier" currency="SP" class="sp-mult-upgrade"/>
    <div class="upgrade-container">
        <Upgrade v-for="(_, idx) in spacetimeUpgrades" :purchasable="spacetimeUpgrades[idx]" currency="SP" :key="idx"/>
    </div>
</template>

<style scoped>
    .sp-mult-upgrade {
        width: 100%;
        padding: 10px 0;
    }
</style>

