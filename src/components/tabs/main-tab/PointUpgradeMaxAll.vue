<script>
    import { pointUpgrade, calcMaxPointUpgradesAffordable } from "@/game/point-upgrade";
    export default {
        name: "PointUpgradeMaxAll",
        methods: {
            buyMaxUpgrades(){
                let maxAffordable = calcMaxPointUpgradesAffordable();
                pointUpgrade.boughtAmount += maxAffordable.amount;
                if(player.points.gte(maxAffordable.totalCost)){
                    player.points = player.points.sub(maxAffordable.totalCost);
                }
            }
        }
    };
</script>

<template>
    <button @click="buyMaxUpgrades" >Max all point upgrades</button>
</template>
