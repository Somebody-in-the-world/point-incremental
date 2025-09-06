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
                tearSpacetimeUpgrades,
                displayUpgrades: false
            };
        },
        methods: {
            update(){
                this.displayUpgrades = player.spacetimeTore;
            }
        }
    };
</script>

<template>
    <TearSpacetimeButton />
    <div class="upgrade-container" v-show="displayUpgrades">
        <Upgrade v-for="(_, idx) in tearSpacetimeUpgrades" :purchasable="tearSpacetimeUpgrades[idx]" currency="SP" :key="idx"/>
    </div>
</template>
