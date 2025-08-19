<script>
    import { darkMatterBoostExponent, calcDarkMatterBoost, calcDarkMatterGain } from "@/game/dark-matter";

    export default {
        name: "DarkMatterDisplay",
        data(){
            return {
                darkMatter: new Decimal(),
                darkMatterBoostExponent,
                darkMatterBoost: new Decimal(),
                darkMatterPerSecond: new Decimal()
            };
        },
        methods: {
            update(){
                this.darkMatter = player.darkMatter;
                this.darkMatterBoost = calcDarkMatterBoost();
                this.darkMatterPerSecond = calcDarkMatterGain();
            }
        }
    };
</script>

<template>
    <h3>
        You have <span class="dark-matter">{{ format(darkMatter) }}</span> dark matter, 
        increased by <span class="dark-matter">^{{ darkMatterBoostExponent.toFixed(2) }}</span> to a 
        <span class="dark-matter">{{ format(darkMatterBoost) }}x</span> boost to point gain
    </h3>
    <h4>
        You are generating <span class="dark-matter">{{ format(darkMatterPerSecond) }}</span> dark matter per second
    </h4>
</template>

<style scoped>
    .dark-matter {
        color: black;
        font-size: 1.25em;
        text-shadow: 0px 2px 5px;
    }
</style>
