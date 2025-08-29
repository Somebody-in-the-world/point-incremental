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
        } else if(Array.isArray(source[prop]) && Array.isArray(target[prop])){
            const length = target[prop].length;
            const mergedArray = [];
            for(let i = 0; i < length; i++){
                if(i < source[prop].length){
                    mergedArray.push(source[prop][i]);
                } else {
                    mergedArray.push(target[prop][i]);
                }
            }
            result[prop] = mergedArray;
        } else {
            result[prop] = source[prop];
        }
    }
    return result;
}
