<script>
    import Upgrade from "@/components/reusable/Upgrade.vue";
    import { spacetimeUpgrades, spacetimePointMultiplier } from "@/game/spacetime";
    export default {
        name: "SpacetimeUpgradesTab",
        components: { Upgrade },
        data(){
            return {
                spacetimeUpgrades,
                spacetimePointMultiplier
            };
        }
    };
</script>

<template>
    <Upgrade :purchasable="spacetimePointMultiplier" currency="SP" id="sp-mult-upgrade"/>
    <div id="upgrade-container">
        <Upgrade v-for="(_, idx) in spacetimeUpgrades" :purchasable="spacetimeUpgrades[idx]" currency="SP" :key="idx"/>
    </div>
</template>

<style scoped>
    #upgrade-container {
        display: grid;
        grid-template-columns: auto auto;
    }

    #sp-mult-upgrade {
        width: 100%;
        padding: 10px 0;
    }
</style>

