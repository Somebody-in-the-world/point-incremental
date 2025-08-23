<script>
    import { notationNames, notationValues } from "@/game/notations";
    
    export default {
        name: "NotationPicker",
        data(){
            return {
                notation: "scientific",
                notationNames,
                notationValues
            };
        },
        methods: {
            update(){
                this.notation = player.settings.notation;
            },
            changeNotation(){
                player.settings.notation = this.notation;
            }
        }
    };
</script>

<template>
    Notation: 
    <select v-model="notation" @change="changeNotation">
        <option v-for="(name, idx) in notationNames" 
            :value="notationValues[idx]">
            {{ name }}
        </option>
    </select>
</template>

