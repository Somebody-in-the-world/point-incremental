<script>
    import { offlineProgressRemainingTicks, offlineProgressTotalTicks } from "@/game/offline-progress";
    import { formatTime } from "@/game/time";

    export default {
        name: "OfflineProgressDisplay",
        data(){
            return {
                displayOfflineProgressLoading: false,
                displayOfflineProgressResult: false,
                remainingTicks: 0,
                totalTicks: 0,
                offlineTime: 0,
                diffObject: {}
            }
        },
        created(){
            Events.UI.add(GAME_EVENTS.DISPLAY_OFFLINE_PROGRESS_LOADING, this.displayProgressLoading, this);
            Events.UI.add(GAME_EVENTS.DISPLAY_OFFLINE_PROGRESS_RESULT, this.displayProgressResult, this);
        },
        methods: {
            update(){
                this.remainingTicks = offlineProgressRemainingTicks;
            },
            displayProgressLoading(offlineTime){
                this.displayOfflineProgressLoading = true;
                this.totalTicks = offlineProgressTotalTicks;
                this.remainingTicks = this.totalTicks;
                this.offlineTime = offlineTime;
            },
            displayProgressResult(diffObject){
                this.displayOfflineProgressLoading = false;
                this.displayOfflineProgressResult = true;
                this.diffObject = diffObject;
            },
            formatTime,
            closeWindow(){
                this.displayOfflineProgressResult = false;
            },
            compareIncrease(a, b){
                if(a instanceof Decimal) return a.gte(b);
                return a >= b;
            }
        }
    };
</script>

<template>
    <div id="offline-progress-cover" v-if="displayOfflineProgressLoading || displayOfflineProgressResult"></div>
    <div id="offline-progress-display" v-if="displayOfflineProgressLoading">
        Loading offline progress...
        <br><br>
        Offline Time: {{ formatTime(offlineTime) }}
        <br><br>
        {{ totalTicks - remainingTicks }} / {{ totalTicks }} ticks 
        ({{ Math.floor((totalTicks - remainingTicks) / totalTicks * 100) }}%)
    </div>
    <div id="offline-progress-result" v-if="displayOfflineProgressResult">
        While you are away for {{ formatTime(offlineTime) }}:
        <button style="float: right;" @click="closeWindow">X</button>
        <br><br>
        <span v-for="prop in diffObject" :key="prop" :hidden="compareIncrease(prop.before, prop.after)">
            <span style="text-shadow: 0 2px 5px" :style="{ color: prop.color }"
                >{{ prop.name }}</span> increased from 
            {{ format(prop.before) }} to {{ format(prop.after) }}
            <br>
        </span>
    </div>
</template>

<style scoped>
    #offline-progress-cover {
        position: fixed;
        width: 100vw;
        height: 100vh;
        margin: 0;
        top: 0;
        border-radius: 0;
        left: 0;
        padding: 0;
        z-index: 998;
        background-color: black;
        opacity: 0.5;
    }

    #offline-progress-display, #offline-progress-result {
        position: fixed;
        z-index: 999;
        background-color: var(--offline-progress-color);
        width: 80vw;
        height: fit-content;
        max-height: 60vh;
        overflow: scroll;
        top: 50%;
        left: 50%;
        margin: 0;
        padding: 10px;
        border: 2px solid;
        transform: translate(-50%, -50%);
    }
</style>
