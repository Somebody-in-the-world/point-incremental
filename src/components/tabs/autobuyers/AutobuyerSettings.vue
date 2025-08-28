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
                extraText: this.autobuyerObject.extraSettings.text,
                hasTextBox: this.autobuyerObject.extraSettings.textbox,
                textBoxInput: "",
                textBoxInputShown: false,
                isActive: true
            };
        },
        methods: {
            update(){
                this.isActive = this.autobuyerObject.active;
                if(this.hasTextBox){
                    this.textBoxInput = this.autobuyerObject.textBoxInput;
                    this.textBoxInputShown = this.autobuyerObject.textBoxInputShown;
                }
            },
            setActive(isActive){
                this.autobuyerObject.active = isActive;
            },
            setInput(input){
                this.autobuyerObject.textBoxInput = input;
            }
        }
    };
</script>

<template>
    <div id="autobuyer-settings">
        {{ name }}
        <br>
        <div v-if="textBoxInputShown">
            {{ extraText }}
            <div v-if="hasTextBox">
                <input type="text" :value="textBoxInput" @input="setInput($event.target.value)" />
            </div>
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
