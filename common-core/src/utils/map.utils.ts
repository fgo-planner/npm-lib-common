const EmptyMap = new Map<any, any>() as ReadonlyMap<any, any>;

/**
 * @returns An immutable empty map.
 */
export function emptyMap<K, V>(): ReadonlyMap<K, V> {
    return EmptyMap;
}

/**
 * @returns A mutable empty map.
 */
export function instantiate<K, V>(): Map<K, V> {
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
