<script>
    import { Achievement } from "@/game/achievements";

    export default {
        name: "Achievement",
        props: {
            achievement: {type: Achievement, required: true}
        },
        data(){
            return {
                title: this.achievement.title,
                requirements: this.achievement.requirements,
                hasReward: this.achievement.reward != null,
                reward: this.achievement.reward,
                unlocked: false
            };
        },
        methods: {
            update(){
                this.unlocked = this.achievement.unlocked;
            }
        }
    };
</script>

<template>
    <div class="achievement" :class="{ unlocked: unlocked }">
        {{ title }}
        <span class="achievement-popup">{{ requirements }}
            <span v-show="hasReward">
                <br>Reward: {{ reward }}
            </span>
        </span>
    </div>
</template>

<style scoped>
    .achievement {
        position: relative;
        width: 100%;
        height: 100%;
        aspect-ratio: 1 / 1;
        border-radius: 3px;
        border-width: 1px;
        border-style: solid;
        padding: 5px;
        text-align: center;
        background-color: var(--ach-locked-color);
        overflow: visible;
    }

    .unlocked {
        background-color: var(--ach-color) !important;
    }

    .achievement-popup {
        opacity: 0;
        width: 150%;
        height: fit-content;
        border-width: 1px;
        border-radius: 5px;
        position: absolute;
        bottom: 75%;
        z-index: 1;
        background-color: #555;
        color: white;
        transition: 0.2s;
        pointer-events: none;
        padding: 5px;
    }

    .achievement:hover .achievement-popup {
        opacity: 0.9;
    }

    @media (max-width: 768px){
        .achievement {
            font-size: 1.75vmin;
        }
        .achievement-popup {
            width: 150%;
            left: -25%;
            font-size: 2vmin;
        }
    }

    @media (min-width: 769px){
        .achievement-popup {
            width: 250%;
            left: -75%;
        }
    }

</style>
