<script>
    import SpacetimeChallengesList from "./SpacetimeChallengesList.vue";
    import SpacetimeChallengesInfo from "./SpacetimeChallengesInfo.vue";

    export default {
        name: "SpacetimeChallengesTab",
        components: {
            SpacetimeChallengesInfo,
            SpacetimeChallengesList
        }
    };
</script>

<template>
    <SpacetimeChallengesInfo />
    <SpacetimeChallengesList />
</template>
