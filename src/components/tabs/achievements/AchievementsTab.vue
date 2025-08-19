<script>
    import Achievement from "./Achievement.vue";
    import { achievements } from "@/game/achievements";

    export default {
        name: "AchievementsDisplay",
        components: {
            Achievement
        },
        data(){
            return {
                achievements
            };
        }
    };
</script>

<template>
    <div class="achievementContainer">
        <Achievement v-for="(achievement, id) in achievements" 
            :achievement="achievement" :key="id" />

    </div>
</template>

<style scoped>
    .achievementContainer {
        display: grid;
        grid-template-columns: auto auto auto auto auto auto auto auto;
    }
</style>
