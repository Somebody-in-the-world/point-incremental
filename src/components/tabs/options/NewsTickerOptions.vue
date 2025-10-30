<script>
    export default {
        name: "NewsTickerOptions",
        data(){
            return {
                newsSpeed: 10,
                newsOn: false
            };
        },
        methods: {
            update(){
                this.newsSpeed = player.options.newsTicker.speed;
                this.newsOn = player.options.newsTicker.on;
            },
            changeSpeed(speed){
                player.options.newsTicker.speed = speed;
            },
            changeNewsOn(on){
                player.options.newsTicker.on = on;
            }
        }
    };
</script>

<template>
    News ticker: 
    <input type="checkbox" v-model="newsOn" @input="changeNewsOn(Boolean($event.target.checked))" />
    <div :hidden="!newsOn">
        News ticker speed: {{ newsSpeed*10 }}%
        <br>
        <input type="range" min="5" max="20"
            v-model="newsSpeed" step="0.5" @input="changeSpeed(Number($event.target.value))" />
    </div>
</template>

