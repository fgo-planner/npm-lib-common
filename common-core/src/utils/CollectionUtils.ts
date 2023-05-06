import { ReadonlyRecord } from '@fgo-planner/common-types';

const EmptyMap = new Map<any, any>() as ReadonlyMap<any, any>;

//#region Arrays

const EmptyArray = [] as ReadonlyArray<any>;

/**
 * @returns An immutable empty array.
 */
export function emptyArray<T>(): ReadonlyArray<T> {
    return EmptyArray;
}

/**
 * @returns A mutable empty array.
 */
export function newArray<T>(): Array<T> {
    return [];
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

//#endregion


//#region Sets

const EmptySet = new Set<any>() as ReadonlySet<any>;

/**
 * @returns An immutable empty set.
 */
export function emptySet<T>(): ReadonlySet<T> {
    return EmptySet;
}

/**
 * @returns A mutable empty set.
 */
export function newSet<T>(): Set<T> {
    return new Set();
}

/**
 * Checks of two sets are equal. Sets are considered to be equal if the contain
 * exactly the same elements. Elements are compared using the `Set.has` method
 * regardless of their type.
 */
export function isSetsEqual<T>(a: ReadonlySet<T>, b: ReadonlySet<T>): boolean {
    if (a === b) {
        return true;
    }
    if (a.size !== b.size) {
        return false;
    }
    for (const elem of a) {
        if (!b.has(elem)) {
            return false;
        }
    }
    return true;
}

/**
 * Removes all the elements in set `a` that are in set `b`.
 *
 * @return `true` if the set was modified as a result of the operation, `false`
 * otherwise.
 */
export function removeAll<T>(a: Set<T>, b: ReadonlySet<T>): boolean {
    let changed = false;
    for (const elem of b) {
        if (!a.has(elem)) {
            continue;
        }
        a.delete(elem);
        changed = true;
    }
    return changed;
}

//#endregion


//#region Maps

/**
 * @returns An immutable empty map.
 */
export function emptyMap<K, V>(): ReadonlyMap<K, V> {
    return EmptyMap;
}

/**
 * @returns A mutable empty map.
 */
export function newMap<K, V>(): Map<K, V> {
    return new Map();
}

export function getOrDefault<K extends string | number | symbol, V>(map: Map<K, V>, key: K, defaultValue: V | (() => V)): V {
    let value = map.get(key);
    if (value !== undefined) {
        return value;
    }
    if (typeof defaultValue === 'function') {
        const instantiate = defaultValue as (() => V);
        value = instantiate();
    } else {
        value = defaultValue;
    }
    map.set(key, value);
    return value;
}

//#endregion


//#region Common

export function mapIterableToObject<T, K extends string | number | symbol>(
    iterable: Iterable<T>,
    keyFunc: (elem: T) => K
): Record<K, T>;

export function mapIterableToObject<T, K extends string | number | symbol, V>(
    iterable: Iterable<T>,
    keyFunc: (elem: T) => K,
    valueFunc: (elem: T) => V
): Record<K, V>;

export function mapIterableToObject<T, K extends string | number | symbol, V>(
    iterable: Iterable<T>,
    keyFunc: (elem: T) => K,
    valueFunc?: (elem: T) => V
): Record<K, T | V> {
    const result = {} as Record<K, T | V>;
    for (const elem of iterable) {
        const key = keyFunc(elem);
        if (valueFunc) {
            result[key] = valueFunc(elem);
        } else {
            result[key] = elem;
        }
    }
    return result;
}

export function mapIterableToMap<T, K>(
    iterable: Iterable<T>,
    keyFunc: (elem: T) => K
): Map<K, T>;

export function mapIterableToMap<T, K, V>(
    iterable: Iterable<T>,
    keyFunc: (elem: T) => K,
    valueFunc: (elem: T) => V
): Map<K, V>;

export function mapIterableToMap<T, K, V>(
    iterable: Iterable<T>,
    keyFunc: (elem: T) => K,
    valueFunc?: (elem: T) => V
): Map<K, T | V> {
    const result = new Map<K, V | T>();
    for (const elem of iterable) {
        const key = keyFunc(elem);
        if (valueFunc) {
            result.set(key, valueFunc(elem));
        } else {
            result.set(key, elem);
        }
    }
    return result;
}

export function objectToMap<K extends string | number | symbol, V>(
    record: ReadonlyRecord<K, V>
): Map<K, V>;

export function objectToMap<K1 extends string | number | symbol, K2, V>(
    record: ReadonlyRecord<K1, V>,
    keyMapFunc: (key: K1) => K2
): Map<K2, V>;

export function objectToMap<K1 extends string | number | symbol, K2, V>(
    record: ReadonlyRecord<K1, V>,
    keyMapFunc?: (key: K1) => K2
): Map<K1, V> | Map<K2, V> {
    const entries = Object.entries(record) as unknown as Array<[K1, V]>;
    if (!keyMapFunc) {
        return new Map(entries);
    }
    return mapIterableToMap(entries, ([key]) => keyMapFunc(key), ([,value]) => value);
}

/**
 * Converts an iterable to a ReadonlyArray and returns it. If the iterable is
 * already an array, then returns it without doing anything.
 */
export function toReadonlyArray<T>(iterable: Iterable<T>): ReadonlyArray<T> {
    if (Array.isArray(iterable)) {
        return iterable;
    }
    return [...iterable];
}

/**
 * Converts an iterable to a ReadonlySet and returns it, with the order of
 * insertion preserved. If the iterable is already a Set, then returns it
 * without doing anything.
 */
export function toReadonlySet<T>(iterable: Iterable<T>): ReadonlySet<T> {
    if (iterable instanceof Set) {
        return iterable;
    }
    return new Set(iterable);
}

//#endregion
