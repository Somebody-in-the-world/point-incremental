<script>
    import { calcDecayEnergyGain, decayEnergyUpgrades, calcDecaySpeedBase } from "@/game/decay";
    import Upgrade from "@/components/reusable/Upgrade.vue";

    export default {
        name: "DecayEnergyTab",
        data(){
            return {
                decayEnergy: new Decimal(),
                decayEnergyGain: new Decimal(),
                decayEnergyUpgrades,
                decaySpeedBase: new Decimal()
            };
        },
        components: {
            Upgrade
        },
        methods: {
            update(){
                this.decayEnergy = player.decayEnergy;
                this.decayEnergyGain = calcDecayEnergyGain();
                this.decaySpeedBase = calcDecaySpeedBase();
            }
        }
    };
</script>

<template>
    <h3 style="text-align: center;">
        You have <span class="decay-energy">{{ format(decayEnergy) }}</span> decay energy 
        (<span class="decay-energy">{{ format(decayEnergyGain) }}</span>/s)
    </h3>
    <h4 style="text-align: center;">
        Protons, neutrons, and electrons past 1e20 will be unstable and will decay towards 1e20, 
        every 60 seconds, they will be {{ format(decaySpeedBase) }}x closer to 1e20, in addition, they will create decay energy
    </h4>
    <div class="upgrade-container">
        <Upgrade v-for="(upgrade, idx) in decayEnergyUpgrades"
            :purchasable="upgrade" currency="decay energy" :key="idx" >
        </Upgrade>
    </div>
</template>

<style scoped>
    .decay-energy {
        font-size: 1.25em;
        color: gold;
        text-shadow: 0px 2px 5px;
    }
</style>
