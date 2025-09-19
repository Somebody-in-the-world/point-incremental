import { formatInt } from "./format";

function partialStandardNotation(exponent){
    const prefixes = ["", "U", "D", "T", "Qa", "Qt", "Sx", "Sp", "O", "N"];
    const decillionTiered = ["", "Dc", "Vg", "Tg", "Qd", "Qi", "Se", "St", "Og", "Nn"];
    const centillionTiered = ["", "Ce", "Dn", "Tc", "Qe", "Qu", "Sc", "Si", "Oe", "Ne"];
    let unit = "";
    unit = centillionTiered[Math.floor((exponent-3)/300)];
    unit = decillionTiered[Math.floor(((exponent-3)%300)/30)] + unit;
    unit = prefixes[Math.floor(((exponent-3)%30)/3)] + unit;
    return unit;
}

function standardNotation(mantissa, exponent){
    const mantissaPart = mantissa * 10**(exponent%3);
    const preDecillion = ["K", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No"];
    let unit = "";
    if(exponent < 33){
        unit = preDecillion[Math.floor(exponent/3)-1];
    } else {
        unit = partialStandardNotation((exponent-3)%3000+3);
    }
    if(exponent >= 3003){
        if(Math.floor((exponent-3)/3)%1000 == 0){
            unit = "Ml";
        } else {
            unit = "Ml-" + unit;
        }
    }
    if(exponent >= 6003){
        unit = partialStandardNotation(Math.floor((((exponent-3)%3000000))/3000)*3+3) + unit; 
    }
    if(exponent >= 3000003){
        if(Math.floor((exponent-3)/3)%1000000 == 0){
            unit = "MC";
        } else {
            unit = "MC-" + unit;
        }
    }
    if(exponent >= 6000003){
        unit = partialStandardNotation(Math.floor((((exponent-3)%3_000_000_000))/3000000)*3+3) + unit; 
    }
    if(exponent >= 3_000_000_003){
        if(Math.floor((exponent-3)/3)%1_000_000_000 == 0){
            unit = "NA";
        } else {
            unit = "NA-" + unit;
        }
    }
    if(exponent >= 6_000_000_003){
        unit = partialStandardNotation(Math.floor((((exponent-3)%3_000_000_000_000))/3_000_000_000)*3+3) + unit; 
    }
    if(exponent >= 3_000_000_000_003){
        if(Math.floor((exponent-3)/3)%1_000_000_000_000 == 0){
            unit = "PC";
        } else {
            unit = "PC-" + unit;
        }
    }
    if(exponent >= 6_000_000_000_003){
        unit = partialStandardNotation(Math.floor((((exponent-3)%3_000_000_000_000_000))/3_000_000_000_000)*3+3) + unit; 
    }
    if(exponent >= 3_000_000_000_000_003){
        if(Math.floor((exponent-3)/3)%1_000_000_000_000_000 == 0){
            unit = "FM";
        } else {
            unit = "FM-" + unit;
        }
    }
    if(exponent >= 6_000_000_000_000_003){
        unit = partialStandardNotation(Math.floor((((exponent-3)%3_000_000_000_000_000_000))/3_000_000_000_000_000)*3+3) + unit; 
    }
    return `${mantissaPart.toFixed(2)} ${unit}`
}

function scienticNotation(mantissa, exponent){
    return `${mantissa.toFixed(2)}e${formatInt(exponent)}`;
}

function logarithmNotation(mantissa, exponent){
    return `e${formatInt(exponent+Math.log10(mantissa), 2)}`;
}

function mixedLogarithmNotation(mantissa, exponent){
    if(exponent < 1000) return logarithmNotation(mantissa, exponent);
    const exp = exponent + Math.log10(mantissa);
    const doubleExponent = Math.floor(Math.log10(exp));
    const expMantissa = exp / 10**doubleExponent;
    return `e${standardNotation(expMantissa, doubleExponent)}`;
}

function infinityNotation(mantissa, exponent){
    const exp = exponent + Math.log10(mantissa);
    return `${formatInt(exp / 308.25, 4)}∞`;
}

function partialOrdinalNotation(mantissa, exponent){
    let ordinal = "";
    let exp = Math.log10(mantissa) + exponent;
    if(exponent >= 10){
        exp = Math.log10(exp);
        let mult = Math.floor(mantissa);
        ordinal = `ω^(${partialOrdinalNotation(10**(exp%1), Math.floor(exp))})${mult>1?'*'+mult:''}`;
    } else if(exponent >= 1) {
        let expPow = Math.floor(exponent);
        let expMult = Math.floor(mantissa);
        let expAdd = partialOrdinalNotation((mantissa%1)*10, Math.floor(exp-1));
        if(expMult>0){
            ordinal = `ω${expPow==1?'':'^'+expPow}${expMult>1?'*'+expMult:''}${expAdd=='0'?'':'+'+expAdd}`;
        } else {
            ordinal = `${expAdd}`;
        }
    } else ordinal = Math.floor(mantissa);
    return ordinal;
}

function ordinalNotation(mantissa, exponent){
    return `g_${partialOrdinalNotation(mantissa, exponent)} (10)`
}

export function pickNotation(notation, mantissa, exponent){
    switch(notation){
        case "mixed scientific":
            if(exponent >= 33) return scienticNotation(mantissa, exponent);
            else return standardNotation(mantissa, exponent);
        case "mixed logarithm":
            return mixedLogarithmNotation(mantissa, exponent);
        case "scientific":
            return scienticNotation(mantissa, exponent);
        case "logarithm":
            return logarithmNotation(mantissa, exponent);
        case "standard": 
            return standardNotation(mantissa, exponent);
        case "infinity":
            return infinityNotation(mantissa, exponent);
        case "ordinal":
            return ordinalNotation(mantissa, exponent);
        case "blind":
            return "";
    }
}

export function updateNotation(){
    Events.UI.dispatch(GAME_EVENTS.NOTATION_CHANGE);
}

export const notationValues = [
    "mixed scientific",
    "mixed logarithm",
    "scientific",
    "logarithm",
    "standard",
    "infinity",
    "ordinal",
    "blind"
];

export const notationNames = [
    "Mixed Scientific",
    "Mixed Logarithm",
    "Scientific",
    "Logarithm",
    "Standard",
    "Infinity",
    "Ordinal",
    "Blind"
];

export const formatUnderThousand = [
    false, false, false, false, false, false, true, true
]
