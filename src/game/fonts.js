export const fontNames = [
    "Monospace", "Courier New", "Sans Serif", "Arial", 
    "Serif", "Cursive", "Wingdings"
];

export const fontFamiles = [
    "Monospace", "Courier New, Monospace", "Arial, sans-serif", "sans-serif", 
    "serif", "cursive", "wingdings"
];

export function switchFont(){
    document.body.style.setProperty("--font-family", 
        fontFamiles[fontNames.indexOf(player.options.font)]);
}
