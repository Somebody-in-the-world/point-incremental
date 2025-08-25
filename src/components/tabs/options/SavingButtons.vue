<script>
    import { getSaveData, saveKey, toggleSave } from "@/game/saving";

    export default {
        name: "SavingButtons",
        data(){
            return {
                saveData: "",
                saveInterval: 2000
            };
        },
        methods: {
            update(){
                this.saveInterval = player.options.saveInterval;
            },
            changeSaveInterval(interval){
                player.options.saveInterval = interval;
            },
            importSave(){
                if(!this.saveData) return;
                console.log(this.saveData);
                if(!window.confirm("Are you really sure you want to import the save? Your progress will be overwritten!")) return;
                try { JSON.parse(atob(this.saveData)); }
                catch(err) {
                    window.alert(`Cannot parse save data (Error: ${err.message})`);
                    return;
                }

                toggleSave(false);
                localStorage.setItem(saveKey, this.saveData);
                location.reload();
            },
            exportSave(){
                this.saveData = getSaveData();
                const textarea = document.getElementById("savedata-display");
                textarea.value = this.saveData;
                textarea.select();
                textarea.setSelectionRange(0, 99999);
                document.execCommand("copy");
            }
        }
    };
</script>

<template>
    <h3>Save Interval: {{ saveInterval / 1000 }}s</h3>
    <input type="range" min="500" max="5000" 
        v-model="saveInterval" step="100" @input="changeSaveInterval(Number($event.target.value))" />
    <textarea id="savedata-display" v-model="saveData" 
        placeholder="Paste your exported save here..." ></textarea>
    <div id="button-container">
        <button @click="importSave">Import Save</button>
        <button @click="exportSave">Export Save</button>
    </div>
</template>

<style scoped>
    #button-container {
        display: grid;
        grid-template-columns: auto auto;
    }

    #button-container > button {
        padding: 10px 0;
    }

    #savedata-display {
        width: 100%;
        height: 20vh;
        resize: vertical;
        user-select: all;
    }
</style>
