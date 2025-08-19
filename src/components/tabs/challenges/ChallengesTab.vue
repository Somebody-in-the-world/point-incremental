<script>
    import ChallengesList from "./ChallengesList.vue";
    import ChallengesInfo from "./ChallengesInfo.vue";

    export default {
        name: "ChallengesTab",
        components: {
            ChallengesInfo,
            ChallengesList
        }
    };
</script>

<template>
    <ChallengesInfo />
    <ChallengesList />
</template>
