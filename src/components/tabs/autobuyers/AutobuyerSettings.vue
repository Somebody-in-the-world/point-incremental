<script>
    import { Autobuyer } from "@/game/autobuyer";
    export default {
        name: "AutobuyerSettings",
        props: {
            autobuyerObject: {type: Autobuyer, required: true}
        },
        data(){
            return {
                name: this.autobuyerObject.name,
                extraText: "",
                hasInput: this.autobuyerObject.hasInput,
                textBoxInput: "",
                inputShown: false,
                isActive: true,
                showChangeModeButton: false
            };
        },
        methods: {
            update(){
                this.isActive = this.autobuyerObject.active;
                if(this.hasInput){
                    this.extraText = this.autobuyerObject.currentModeObject.text;
                    this.input = this.autobuyerObject.input;
                    this.inputShown = this.autobuyerObject.totalUnlockedModes > 0;
                    this.showChangeModeButton = this.autobuyerObject.totalUnlockedModes > 1;
                }
            },
            setActive(isActive){
                this.autobuyerObject.active = isActive;
            },
            setInput(input){
                this.autobuyerObject.input = input;
            },
            changeMode(){
                this.autobuyerObject.mode = 
                    (this.autobuyerObject.mode + 1) % this.autobuyerObject.totalUnlockedModes;
            }
        }
    };
</script>

<template>
    <div id="autobuyer-settings">
        {{ name }}
        <br>
        <div v-if="hasInput && inputShown">
            <div>
                <button v-if="showChangeModeButton" @click="changeMode">Change Mode</button>
            </div>
            {{ extraText }}
            <input type="text" :value="input" @input="setInput($event.target.value)" />
        </div>
        <br>
        Active: <input type="checkbox" :checked="isActive" @input="setActive($event.target.checked)" />
    </div>
</template>

<style scoped>
    #autobuyer-settings {
        border: 2px solid;
        border-radius: 5px;
        padding: 10px 0px;
        text-align: center;
        margin: 1px;
    }
</style>
