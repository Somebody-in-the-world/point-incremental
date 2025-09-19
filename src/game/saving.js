import { serializeDecimals, deserializeDecimals } from "./decimal-utils";
import { mergeObjects } from "./object-utils";

export const saveKey = "pointGameGamesave";
let enableSave = true;

export function loadGame(){
    const rawSaveData = localStorage.getItem(saveKey);
    if(!rawSaveData) return;
    try {
        player = mergeObjects(player, deserializeDecimals(
            JSON.parse(atob(rawSaveData))));
    } catch(err) {
        window.alert(`Save cannot be read (Error: ${err.message})`);
        localStorage.removeItem(saveKey);
        location.reload();
    }
}

export function getSaveData(){
    return btoa(JSON.stringify(serializeDecimals(player)));
}

export function saveGame(){
    const saveData = getSaveData();
    if(enableSave){
        localStorage.setItem(saveKey, saveData);
    }
}

export function toggleSave(isOn){
    enableSave = isOn;
}

export function resetGame(){
    toggleSave(false);
    localStorage.removeItem(saveKey);
    location.reload();
}
