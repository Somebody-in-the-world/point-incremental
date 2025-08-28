<script>
    import { darkMatterUnlockRequirements } from "@/game/dark-matter";

    export default {
        name: "DarkMatterUnlockButton",
        data(){
            return {
                unlockReq: new Decimal(),
                canUnlockDarkMatter: false,
                hasUnlockedGenerators: false,
                allGeneratorsUnlocked: false
            }
        },
        methods: {
            update(){
                this.unlockReq = darkMatterUnlockRequirements[player.darkGeneratorsUnlocked];
                this.hasUnlockedGenerators = player.darkGeneratorsUnlocked > 0;
                this.allGeneratorsUnlocked = player.darkGeneratorsUnlocked >= darkMatterUnlockRequirements.length;
                this.canUnlockDarkMatter = player.points.gte(this.unlockReq) && !(this.allGeneratorsUnlocked);
            },
            unlockDarkGenerator(){
                player.darkGeneratorsUnlocked += 1;
            }
        },
        computed: {
            darkMatterUnlockGoal(){
                this._tickUpdate; // Vue reactivity stuff
                if(this.allGeneratorsUnlocked){
                    return "All dark generators unlocked!";
                }
                const nextUnlockReq = this.unlockReq;
                const unlockType = this.hasUnlockedGenerators ? "a new dark generator" : "dark matter";
                return `Reach ${this.format(nextUnlockReq)} points to unlock ${unlockType}`
            }
        }
    };
</script>

<template>
    <button class="spacetime-alt" id="dark-matter-unlock-button" :disabled="!canUnlockDarkMatter" @click="unlockDarkGenerator">
        <span v-if="canUnlockDarkMatter">
            Unlock {{ hasUnlockedGenerators ? "a new dark generator" : "dark matter" }}
        </span>
        <span v-if="!canUnlockDarkMatter">
            {{ darkMatterUnlockGoal }}
        </span>
    </button>
</template>

<style scoped>
    #dark-matter-unlock-button {
        width: 100%;
        height: 12.5vh;
        border: 2px solid;
    }
</style>
