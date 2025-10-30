<script>
    import { 
        calcDimensionalPowerGain, 
        calcDimensionalPowerBoost,
        calcChall2FreePointUpgrades,
        dimensionalVortex,
        calcBaseDimensionalPowerBoost
    } from "@/game/dimensional";
    import { spacetimeChallenges } from "@/game/spacetime-challenges";

    export default {
        name: "DimensionalPowerDisplay",
        data(){
            return {
                baseDimensionalPowerBoost: new Decimal(),
                dimensionalPower: new Decimal(),
                dimensionalPowerGain: new Decimal(),
                dimensionalPowerBoost: new Decimal(),
                chall2FreePointUpgrades: new Decimal(),
                chall2Completed: false,
                dimensionalVortexBought: false,
                dimensionalVortexExponent: new Decimal()
            };
        },
        methods: {
            update(){
                this.baseDimensionalPowerBoost = calcBaseDimensionalPowerBoost().mul(100);
                this.dimensionalPower = player.dimensionalPower;
                this.dimensionalPowerGain = calcDimensionalPowerGain();
                this.dimensionalPowerBoost = calcDimensionalPowerBoost().mul(100);
                this.chall2FreePointUpgrades = calcChall2FreePointUpgrades();
                this.chall2Completed = spacetimeChallenges[1].completed;
                this.dimensionalVortexBought = dimensionalVortex.boughtAmount != 0;
                this.dimensionalVortexExponent = dimensionalVortex.effect;
            }
        }
    };
</script>

<template>
    <h3>
        You have <span class="dimPower">{{ format(dimensionalPower) }}</span> dimensional power, 
        adding <span class="dimPower">{{ format(baseDimensionalPowerBoost) }}%</span> 
        <span v-if="dimensionalVortexBought"><span style="font-size: 1.25em"> ^ </span><span style="color: #503a5f; font-size: 1.25em; text-shadow: 0 2px 5px;">{{ format(dimensionalVortexExponent) }}</span> 
            <span style="font-size: 1.25em"> = </span><span class="dimPower">{{ format(dimensionalPowerBoost) }}%</span></span> to your point upgrade multiplier
        <span v-if="chall2Completed">and giving you <span class="dimPower">{{ format(chall2FreePointUpgrades) }}</span> free point upgrades from challenge 2 reward</span>
    </h3>
    <h4>
        You are currently getting <span class="dimPower">{{ format(dimensionalPowerGain) }}</span> dimensional power per second
    </h4>
</template>

<style scoped>
    .dimPower {
        font-size: 1.25em;
        color: #0080aa;
        text-shadow: 0 2px 5px;
    }
</style>
