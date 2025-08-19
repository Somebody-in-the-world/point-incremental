import { serializeDecimals, deserializeDecimals } from "./decimal-utils";
import { mergeObjects } from "./object-utils";

export const saveKey = "pointGameGamesave";

export function loadGame(){
    const rawSaveData = localStorage.getItem(saveKey);
    if(!rawSaveData) return;
    player = mergeObjects(player, deserializeDecimals(
        JSON.parse(atob(rawSaveData))));
}

export function saveGame(){
    const saveData = btoa(JSON.stringify(serializeDecimals(player)));
    localStorage.setItem(saveKey, saveData);
}
