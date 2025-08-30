<script>
    import { notationNames, notationValues, updateNotation } from "@/game/notations";
    
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
                this.notation = player.options.notation;
            },
            changeNotation(){
                player.options.notation = this.notation;
                updateNotation();
            }
        }
    };
</script>

<template>
    Notation: 
    <select v-model="notation" @change="changeNotation">
        <option v-for="(name, idx) in notationNames" 
            :value="notationValues[idx]" :key="idx">
            {{ name }}
        </option>
    </select>
</template>

