<script>
    export default {
        name: "UpdateRateSlider",
        data(){
            return {
                updateRate: 33
            };
        },
        methods: {
            update(){
                this.updateRate = player.options.updateRate;
            },
            changeUpdateRate(updateRate){
                player.options.updateRate = updateRate;
            }
        }
    };
</script>

<template>
    <h3>Update Rate: {{ updateRate }}ms</h3>
    <input type="range" min="20" max="200" 
        v-model="updateRate" step="1" @input="changeUpdateRate(Number($event.target.value))" />
</template>
