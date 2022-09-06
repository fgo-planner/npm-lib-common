export function mapArrayToObject<T, K extends string | number | symbol>(
    arr: ReadonlyArray<T>,
    keyFunc: (elem: T) => K
): Record<K, T>;

export function mapArrayToObject<T, K extends string | number | symbol, V>(
    arr: ReadonlyArray<T>,
    keyFunc: (elem: T) => K,
    valueFunc: (elem: T) => V
): Record<K, V>;

export function mapArrayToObject<T, K extends string | number | symbol, V>(
    arr: ReadonlyArray<T>,
    keyFunc: (elem: T) => K,
    valueFunc?: (elem: T) => V
): Record<K, T | V> {
    const result = {} as Record<K, T | V>;
    for (const elem of arr) {
        const key = keyFunc(elem);
        if (valueFunc) {
            result[key] = valueFunc(elem);
        } else {
            result[key] = elem;
        }
    }
    return result;
}

export function mapArrayToMap<T, K extends string | number | symbol>(
    arr: ReadonlyArray<T>,
    keyFunc: (elem: T) => K
): Map<K, T>;

export function mapArrayToMap<T, K extends string | number | symbol, V>(
    arr: ReadonlyArray<T>,
    keyFunc: (elem: T) => K,
    valueFunc: (elem: T) => V
): Map<K, V>;

export function mapArrayToMap<T, K extends string | number | symbol, V>(
    arr: ReadonlyArray<T>,
    keyFunc: (elem: T) => K,
    valueFunc?: (elem: T) => V
): Map<K, T | V> {
    const result = new Map<K, V | T>();
    for (const elem of arr) {
        const key = keyFunc(elem);
        if (valueFunc) {
            result.set(key, valueFunc(elem));
        } else {
            result.set(key, elem);
        }
    }
    return result;
}

/**
 * Swaps two elements of the given array at the given indexes. The original
 * array is modified in-place.
 * 
 * If the given indices are equal, no operations will be performed. If one or
 * more of the indexes are out of bounds, an error is thrown.
 */
export function swapElements(array: Array<any>, a: number, b: number) {
    if (a === b) {
        return;
    }
    checkBounds(array, a);
    checkBounds(array, b);

    [array[b], array[a]] = [array[a], array[b]];
}

/**
 * Moves an elements of the given array at the given index to the target index.
 * The original array is modified in-place.
 * 
 * If the given indices are equal, no operations will take place. If one or
 * more of the indexes are out of bounds, an error is thrown.
 */
export function moveElement<T>(array: Array<T>, from: number, to: number): Array<T> {
    if (from === to) {
        return array;
    }
    checkBounds(array, from);
    checkBounds(array, to);

    const element = array.splice(from, 1)[0];
    array.splice(to, 0, element);
    return array;
}

function checkBounds<T>(array: Array<T>, index: number): void {
    if (index < 0 || index >= array.length) {
        throw new Error(`Index ${index} is out of bounds`);
    }
}
