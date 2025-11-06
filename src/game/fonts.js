export const fontNames = [
    "Monospace", "Courier New", "Sans Serif", "Comic Sans", 
    "Serif", "Cursive", "Wingdings"
];

export const fontFamiles = [
    "Monospace", "Courier New, Monospace", "Comic Sans", "sans-serif", 
    "serif", "cursive", "wingdings"
];

export function switchFont(){
    document.body.style.setProperty("--font-family", 
        fontFamiles[fontNames.indexOf(player.options.font)]);
}
