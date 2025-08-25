import { INFINITY } from "./constants";
import { pickNotation } from "./notations";

export function format(number, precision = 2){
    let formatted;
    if(number.layer == 0){
        if(number.mag < 1000) formatted = number.mag.toFixed(precision);
        else {
            const mantissa = number.mag / 10**Math.floor(Math.log10(number));
            const exponent = Math.floor(Math.log10(number.mag));
            formatted = pickNotation(player.options.notation, mantissa, exponent);
        }
    } else if (number.layer == 1){
        const isNegative = number.mag < 0;
        if(isNegative) number = number.pow(-1);
        const mantissa = 10**(number.mag - Math.floor(number.mag));
        const exponent = Math.floor(number.mag);
        formatted = pickNotation(player.options.notation, mantissa, exponent);
        if(isNegative) formatted = `1 / ${formatted}`;
    }

    if(number.gte(INFINITY) && (!(player.spacetimeTore))) formatted = "Infinite";

    if(number.lt(0)) formatted = "-" + formatted;

    return formatted;
}
