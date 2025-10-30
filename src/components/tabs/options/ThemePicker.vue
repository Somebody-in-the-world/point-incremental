<script>
    import { themeNames, themeValues, applyTheme } from "@/game/themes";
    
    export default {
        name: "ThemePicker",
        data(){
            return {
                theme: "classic",
                themeNames,
                themeValues
            };
        },
        methods: {
            update(){
                this.theme = player.options.theme;
            },
            changeTheme(){
                player.options.theme = this.theme;
                applyTheme();
            }
        }
    };
</script>

<template>
    Theme: 
    <select v-model="theme" @change="changeTheme">
        <option v-for="(name, idx) in themeNames" 
            :value="themeValues[idx]" :key="idx">
            {{ name }}
        </option>
    </select>
</template>

