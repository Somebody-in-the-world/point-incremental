import { isObject } from "./object-utils";

export function decimalToObject(decimal){
    if(!(decimal instanceof Decimal)){
        throw new TypeError("Input must be type Decimal.");
    }
    return {
        sign: decimal.sign, 
        mag: decimal.mag,
        layer: decimal.layer
    };
};

export function isDecimalObject(object){
    return isObject(object) &&
        "sign" in object &&
        "mag" in object &&
        "layer" in object;
};

export function objectToDecimal(object){
    if(!isDecimalObject(object)){
        throw new TypeError("Object is not a serialized decimal.");
    }
    const dec = new Decimal();
    dec.sign = object.sign;
    dec.mag = object.mag;
    dec.layer = object.layer;
    return dec;
};

export function serializeDecimals(input){
    if(input instanceof Decimal) return decimalToObject(input);
    if(Array.isArray(input)) return input.map(serializeDecimals);
    if(isObject(input)){
        const result = {};
        for(const prop in input){
            result[prop] = serializeDecimals(input[prop]);
        }
        return result;
    }
    return input;
}

export function deserializeDecimals(input){
    if(isDecimalObject(input)) return objectToDecimal(input);
    if(Array.isArray(input)) return input.map(deserializeDecimals);
    if(isObject(input)){
        const result = {};
        for(const prop in input){
            result[prop] = deserializeDecimals(input[prop]);
        }
        return result;
    }
    return input;
}
