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
    <div class="achievement" :class="{ unlocked: unlocked }">{{ title }}
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
        width: 10vw;
        height: 10vw;
        border-radius: 3px;
        border-width: 1px;
        border-style: solid;
        padding: 5px;
        font-size: 0.6em;
        text-align: center;
        background-color: #ccc;
    }

    .unlocked {
        background-color: #78e25a !important;
    }

    .achievement-popup {
        opacity: 0;
        width: 150%;
        height: fit-content;
        border-width: 1px;
        border-radius: 5px;
        position: absolute;
        bottom: 75%;
        left: -30%;
        z-index: 1;
        background-color: #555;
        color: white;
        transition: 0.2s;
        pointer-events: none;
        padding: 5px;
        font-size: 1.2em;
    }

    .achievement:hover .achievement-popup {
        opacity: 0.9;
    }
</style>
