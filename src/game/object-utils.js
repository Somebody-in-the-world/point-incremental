export function isObject(item){
    return item !== null && typeof item == "object" && !Array.isArray(item);
}

export function mergeObjects(target, source){
    const result = { ...target };
    for(const prop in source){
        if(source[prop] instanceof Decimal && result[prop] instanceof Decimal){
            result[prop] = source[prop];
        } else if(isObject(source[prop]) && isObject(result[prop])){
            result[prop] = mergeObjects(result[prop], source[prop]);
        } else {
            result[prop] = source[prop];
        }
    }
    return result;
}
