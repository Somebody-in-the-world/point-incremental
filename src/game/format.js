import { INFINITY } from "./constants";

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

export function format(number){
    let formatted;
    if(number.layer == 0){
        if(number.mag < 1000) formatted = number.mag.toFixed(2);
        else {
            const mantissa = number.mag / 10**Math.floor(Math.log10(number));
            const exponent = Math.floor(Math.log10(number.mag));
            formatted = `${mantissa.toFixed(2)}e${exponent}`;
            //formatted = standardNotation(mantissa, exponent);
        }
    } else if (number.layer == 1){
        const isNegative = number.mag < 0;
        if(isNegative) number = number.pow(-1);
        const mantissa = 10**(number.mag - Math.floor(number.mag));
        const exponent = Math.floor(number.mag);
        formatted = `${mantissa.toFixed(2)}e${exponent}`;
 //       formatted = standardNotation(mantissa, exponent);
        if(isNegative) formatted = `1 / ${formatted}`;
    }

    if(number.gte(INFINITY) && (!(player.spacetimeTore))) formatted = "Infinite";

    if(number.lt(0)) formatted = "-" + formatted;

    return formatted;
}
