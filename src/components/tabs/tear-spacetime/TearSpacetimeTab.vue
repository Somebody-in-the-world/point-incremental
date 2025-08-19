<script>
    import Upgrade from "@/components/reusable/Upgrade.vue";
    import TearSpacetimeButton from "./TearSpacetimeButton.vue";
    import { tearSpacetimeUpgrades } from "@/game/tear-spacetime";

    export default {
        name: "TearSpacetimeTab",
        components: {
            TearSpacetimeButton,
            Upgrade
        },
        data(){
            return {
                tearSpacetimeUpgrades
            };
        }
    };
</script>

<template>
    <TearSpacetimeButton />
    <div id="upgrade-container">
        <Upgrade v-for="(_, idx) in tearSpacetimeUpgrades" :purchasable="tearSpacetimeUpgrades[idx]" currency="SP" :key="idx"/>
    </div>
</template>

<style scoped>
    #upgrade-container {
        display: grid;
        grid-template-columns: 50% 50%;
        width: 100%;
    }
</style>
