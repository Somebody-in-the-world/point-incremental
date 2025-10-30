import { INFINITY } from "./constants";
import { pickNotation, formatUnderThousand, notationValues } from "./notations";

export function formatInt(number, decimals = 0){
    return number.toLocaleString("en-US", {
        minimumFractionDigits: decimals, 
        maximumFractionDigits: decimals
    });
}

export function format(number, precision = 2){
    if(typeof number == "number") return formatInt(number);
    if(number.mag+""=="NaN" || number.mag==null) return "NaN";
    let formatted;
    if(number.layer == 0){
        if(number.mag < 1000){
            if(formatUnderThousand[notationValues.indexOf(player.options.notation)]){
                const exponent = Math.floor(Math.log10(number.mag));
                const mantissa = number.mag == 0 ? 0 : number.mag / 10**exponent;
                formatted = pickNotation(player.options.notation, mantissa, exponent);
            } else {
                formatted = number.mag.toFixed(precision);
            }
        }
        else {
            const mantissa = number.mag / 10**Math.floor(Math.log10(number));
            const exponent = Math.floor(Math.log10(number.mag));
            formatted = pickNotation(player.options.notation, mantissa, exponent);
        }
    } else if (number.layer == 1){
        const smallNumber = number.mag < 0;
        if(smallNumber) number = number.pow(-1);
        const mantissa = 10**(number.mag - Math.floor(number.mag));
        const exponent = Math.floor(number.mag);
        formatted = pickNotation(player.options.notation, mantissa, exponent);
        if(smallNumber) formatted = `1 / ${formatted}`;
    } else if (number.layer < 5){
        formatted = `e${format(new Decimal(10).tetrate(number.slog().sub(1)), precision)}`;
    } else if (number.layer < 1e8){
        formatted = `${format(new Decimal(10).tetrate(number.layer%1), precision)}F${format(new Decimal(number.layer), 0)}`
    }

    if(number.gte(INFINITY) && (!(player.spacetimeTore))) formatted = "Infinite";

    if(number.lt(0)) formatted = "-" + formatted;

    return formatted;
}
