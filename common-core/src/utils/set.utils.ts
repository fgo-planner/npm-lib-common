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
export function instantiate<T>(): Set<T> {
    return new Set();
}

export function isEqual<T>(a: ReadonlySet<T>, b: ReadonlySet<T>): boolean {
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
