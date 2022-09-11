const EmptySet = new Set<any>() as ReadonlySet<any>;

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

export function emptySet<T>(): ReadonlySet<T> {
    return EmptySet;
}
