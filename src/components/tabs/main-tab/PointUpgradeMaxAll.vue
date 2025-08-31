<script>
    import { pointUpgrade, bulkBuyPointUpgrades } from "@/game/point-upgrade";
    export default {
        name: "PointUpgradeMaxAll",
        methods: {
            bulkBuyPointUpgrades
        }
    };
</script>

<template>
    <button @click="bulkBuyPointUpgrades" >Max all point upgrades</button>
</template>
