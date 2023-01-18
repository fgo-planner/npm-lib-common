import { ReadonlyRecord } from '@fgo-planner/common-types';

export function getOrDefault<K extends string | number | symbol, V>(obj: Record<K, V>, key: K, defaultValue: V | (() => V)): V {
    let value = obj[key];
    if (value !== undefined) {
        return value;
    }
    if (typeof defaultValue === 'function') {
        const instantiate = defaultValue as (() => V);
        value = instantiate();
    } else {
        value = defaultValue;
    }
    return obj[key] = value;
}

export function isShallowEquals(a: ReadonlyRecord<string, any>, b: ReadonlyRecord<string, any>): boolean {
    for (const key of Object.keys(a)) {
        if (!(key in b) || !_isValuesEqual(a[key], b[key])) {
            return false;
        }
    }
    for (const key of Object.keys(b)) {
        if (!(key in a) || !_isValuesEqual(a[key], b[key])) {
            return false;
        }
    }
    return true;
}

function _isValuesEqual(a: any, b: any): boolean {
    if (a instanceof Date) {
        a = a.getTime();
    }
    if (b instanceof Date) {
        b = b.getTime();
    }
    return a === b;
}
