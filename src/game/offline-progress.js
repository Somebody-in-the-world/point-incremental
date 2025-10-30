import { calcGravitationalWavesGained } from "./atomic";

export const maxOfflineTicks = 1000;
export let offlineProgressRemainingTicks = 0;
export let offlineProgressTotalTicks = 0;
let isOfflineProgress = false;
let offlineProgressSpeed = 0;

const diffStats = {
    points: { getter: () => player.points, 
        name: "Points", 
        color: {
            classic: "#8080ff", dark: "#8080ff", colorful: "darkgreen"
        }
    },
    pointUpgrades: { getter: () => player.pointUpgrade.boughtAmount, 
        name: "Point upgrades", 
        color: {
            classic: "#6060ff", dark: "#a0a0ff", colorful: "#654321"
        }
    },
    compressedPoints: { getter: () => player.compressedPoints,
        name: "Compressed points", 
        color: {
            classic: "#3030ff", dark: "#c0c0ff", colorful: "antiquewhite"
        }
    },
    automationPoints: { getter: () => player.automationPoints,
        name: "Automation points", 
        color: {
            classic: "#2020ff", dark: "#d0d0ff", colorful: "aliceblue"
        }
    },
    dimensionalPoints: { getter: () => player.dimensionalPoints,
        name: "Dimensional points", 
        color: {
            classic: "#0080dd", dark: "#0080dd", colorful: "coral"
        }
    },
    dimensionalPower: { getter: () => player.dimensionalPower,
        name: "Dimensional power", 
        color: {
            classic: "#0080aa", dark: "#0080aa", colorful: "#fedcba"
        }
    },
    spacetimePoints: { getter: () => player.spacetimePoints,
        name: "Spacetime points", 
        color: {
            classic: "black", dark: "white", colorful: "chocolate"
        }
    },
    darkMatter: { getter: () => player.darkMatter,
        name: "Dark matter", 
        color: {
            classic: "black", dark: "white", colorful: "darkorange"
        }
    },
    particles: { getter: () => player.particles,
        name: "Particles", 
        color: {
            classic: "#60a0ff", dark: "#60a0ff", colorful: "darksalmon"
        }
    },
    gravity: { getter: () => player.gravity,
        name: "Gravity", 
        color: {
            classic: "#808080", dark: "#808080", colorful: "lavender"
        }
    },
    gravitationalWaves: { getter: () => calcGravitationalWavesGained(),
        name: "Gravitational waves", 
        color: {
            classic: "#404040", dark: "#a0a0a0", colorful: "lawngreen"
        }
    },
    quantumFoam: { getter: () => player.quantumFoam,
        name: "Quantum foam", 
        color: {
            classic: "orange", dark: "orange", colorful: "firebrick"
        }
    },
    decayEnergy: { getter: () => player.decayEnergy,
        name: "Decay energy", 
        color: {
            classic: "yellow", dark: "yellow", colorful: "dodgerblue"
        }
    }
};

const diffObject = {};

export function isRunningOfflineProgress(){
    return isOfflineProgress;
}

export function calcOfflineProgressSpeed(){
    return offlineProgressSpeed;
}

export function calcOfflineProgress(){
    if(offlineProgressRemainingTicks > 0){
        isOfflineProgress = true;
        offlineProgressRemainingTicks--;
    } else {
        if((offlineProgressTotalTicks != 0) && (Object.keys(diffObject).length > 0)){
            for(const prop of Object.keys(diffStats)){
                diffObject[prop].after = diffStats[prop].getter();
            }
            Events.UI.dispatch(GAME_EVENTS.DISPLAY_OFFLINE_PROGRESS_RESULT, [diffObject]);
        }
        isOfflineProgress = false;
        offlineProgressSpeed = 0;
        offlineProgressTotalTicks = 0;
    }
}

export function startOfflineProgress(time){
    offlineProgressTotalTicks = calcOfflineTicks(time);
    offlineProgressRemainingTicks = offlineProgressTotalTicks;
    offlineProgressSpeed = calcOfflineTickInterval(time);
    if(time > 30){
        for(const prop of Object.keys(diffStats)){
            diffObject[prop] = {before: diffStats[prop].getter()};
            diffObject[prop].name = diffStats[prop].name;
            diffObject[prop].color = diffStats[prop].color[player.options.theme];
        }
        Events.UI.dispatch(GAME_EVENTS.DISPLAY_OFFLINE_PROGRESS_LOADING, 
            [time]);
    }
}

export function calcOfflineTickInterval(time){
    return Math.max(time / maxOfflineTicks, 1);
}

export function calcOfflineTicks(time){
    return Math.floor(time / calcOfflineTickInterval(time));
}


