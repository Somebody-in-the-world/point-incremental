<script>
    import { fontNames, fontFamiles, switchFont } from "@/game/fonts";
    
    export default {
        name: "FontPicker",
        data(){
            return {
                font: "Monospace",
                fontNames,
                fontFamiles
            };
        },
        methods: {
            update(){
                this.font = player.options.font;
            },
            changeNotation(){
                player.options.font = this.font;
                switchFont();
            }
        }
    };
</script>

<template>
    Font: 
    <select v-model="font" @change="changeNotation">
        <option v-for="(name, idx) in fontNames" 
            :value="fontNames[idx]" :key="idx">
            {{ name }}
        </option>
    </select>
</template>

