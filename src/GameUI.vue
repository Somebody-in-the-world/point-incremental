<script>
    import PointDisplay from "./components/PointDisplay.vue";
    import AntiPointsDisplay from "./components/AntiPointsDisplay.vue";
    import SpacetimePointsDisplay from "./components/SpacetimePointsDisplay.vue";
    import tabComponents from "./components/tabs";

    import SpacetimeButton from "./components/SpacetimeButton.vue";
    import PostTearSpacetimeButton from "./components/PostTearSpacetimeButton.vue";
    import DarkMatterUnlockButton from "./components/DarkMatterUnlockButton.vue";
    import AtomicButton from "./components/AtomicButton.vue";
    import ParticlesDisplay from "./components/ParticlesDisplay.vue";

    import SubTabSwitch from "./components/tabs/SubTabSwitch.vue";
    import TabSwitch from "./components/tabs/TabSwitch.vue";
    import { currentTab, currentSubTab, tabComponentNames, subTabComponentNames } from "./game/tabs.js";
    import { canSpacetime } from "./game/spacetime";
    import { canAtomic } from "./game/atomic";

    export default {
        name: "GameUI",
        components: {
            ...tabComponents,
            PointDisplay,
            AntiPointsDisplay,
            SpacetimePointsDisplay,
            SubTabSwitch,
            TabSwitch,
            SpacetimeButton,
            PostTearSpacetimeButton,
            DarkMatterUnlockButton,
            AtomicButton,
            ParticlesDisplay
        },
        data(){
            return {
                tabComponentName: tabComponentNames[0],
                forceSpacetime: false,
                hideTab: false,
                spacetimeTore: false,
                displaySpacetimePoints: false,
                showDarkGenrators: false,
                displayParticles: false
            };
        },
        methods: {
            update(){
                if(subTabComponentNames[currentTab].length == 0){
                    this.tabComponentName = tabComponentNames[currentTab];
                } else {
                    this.tabComponentName = subTabComponentNames[currentTab][currentSubTab];
                }
                this.spacetimeTore = player.spacetimeTore;
                this.forceSpacetime = canSpacetime() && (!this.spacetimeTore);
                this.hideTab = this.forceSpacetime && !(player.records.fastestSpacetime < 60 || player.records.atomicAmount > 0);
                this.displaySpacetimePoints = player.records.totalSpacetimeAmount > 0;
                this.showDarkGenrators = (player.darkGeneratorsUnlocked < 6) && (!canAtomic());
                this.displayParticles = player.records.atomicAmount > 0;
            }
        }
    };
</script>

<template>
    <div v-if="spacetimeTore">
        <div id="top-buttons">
            <PostTearSpacetimeButton />
            <DarkMatterUnlockButton v-if="showDarkGenrators" />
            <AtomicButton v-if="!showDarkGenrators" />
        </div>
        <br>
    </div>
    <ParticlesDisplay v-if="displayParticles" />
    <SpacetimePointsDisplay v-if="displaySpacetimePoints" />
    <AntiPointsDisplay />
    <PointDisplay />
    <SpacetimeButton v-if="forceSpacetime" />
    <!-- it is here to reduce flickering, but it causes lag -->
    <!-- <KeepAlive> -->
    <component :is="tabComponentName" v-if="!hideTab" />
    <!-- </KeepAlive> -->
    <hr>
    <SubTabSwitch />
    <hr>
    <TabSwitch />
</template>

<style scoped>
    #top-buttons {
        display: grid;
        grid-template-columns: 50% 50%;
    }
</style>
