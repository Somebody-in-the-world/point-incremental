const themeCSSVars = {
    classic: {
        "--text-color": "black",
        "--bg-color": "white",
        "--border-color": "black",
        "--button-color": "#e8e8e8",
        "--hovered-button-color": "#202020",
        "--hovered-button-bg-color": "#cccccc",
        "--disabled-button-color": "#808080",
        "--disabled-button-bg-color": "#eeeeee",
        "--purchased-bg-color": "#cccccc",
        "--spacetime-color": "white",
        "--spacetime-bg-color": "black",
        "--spacetime-alt-color": "white",
        "--spacetime-alt-bg-color": "black",
        "--ach-color": "#78e25a",
        "--ach-locked-color": "#cccccc",
        "--milestone-color": "#00ff00",
        "--milestone-locked-color": "#ff8080",
        "--offline-progress-color": "#f0f0f0"
    },
    dark: {
        "--text-color": "#eeeeee",
        "--bg-color": "black",
        "--border-color": "white",
        "--button-color": "#303030",
        "--hovered-button-color": "#cccccc",
        "--hovered-button-bg-color": "#202020",
        "--disabled-button-color": "#808080",
        "--disabled-button-bg-color": "#303030",
        "--purchased-bg-color": "#111111",
        "--spacetime-color": "black",
        "--spacetime-bg-color": "white",
        "--spacetime-alt-color": "white",
        "--spacetime-alt-bg-color": "black",
        "--ach-color": "#008000",
        "--ach-locked-color": "#808080",
        "--milestone-color": "#008000",
        "--milestone-locked-color": "#a04040",
        "--offline-progress-color": "#202020"
    },
    colorful: {
        "--text-color": "blue",
        "--bg-color": "red",
        "--border-color": "yellow",
        "--button-color": "green",
        "--hovered-button-color": "darkblue",
        "--hovered-button-bg-color": "black",
        "--disabled-button-color": "white",
        "--disabled-button-bg-color": "orange",
        "--purchased-bg-color": "lightgreen",
        "--spacetime-color": "purple",
        "--spacetime-bg-color": "pink",
        "--spacetime-alt-color": "gray",
        "--spacetime-alt-bg-color": "crimson",
        "--ach-color": "lightgreen",
        "--ach-locked-color": "darkred",
        "--milestone-color": "aqua",
        "--milestone-locked-color": "brown",
        "--offline-progress-color": "magenta"
    }
}

export function applyTheme(){
    const root = document.querySelector(":root");
    for(const v in themeCSSVars[player.options.theme]){
        root.style.setProperty(v, themeCSSVars[player.options.theme][v]);
    }
    Events.UI.dispatch(GAME_EVENTS.THEME_UPDATE);
}

export const themeValues = [
    "classic",
    "dark",
    "colorful"
];

export const themeNames = [
    "Classic",
    "Dark",
    "Colorful"
]

