<script>
    import AtomicChallengesList from "./AtomicChallengesList.vue";
    import AtomicChallengesInfo from "./AtomicChallengesInfo.vue";

    export default {
        name: "AtomicChallengesTab",
        components: {
            AtomicChallengesInfo,
            AtomicChallengesList
        }
    };
</script>

<template>
    <AtomicChallengesInfo />
    <AtomicChallengesList />
</template>
