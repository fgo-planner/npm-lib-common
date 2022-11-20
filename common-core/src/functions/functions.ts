
/**
 * Returns the given value as-is.
 */
export const identity = function <T>(value: T): T {
    return value;
};

/**
 * Supplies a `null` value.
 */
export const nullSupplier = function (): null {
    return null;
};

/**
 * Supplies an empty object (`{}`) value.
 */
export const emptyObjectSupplier = function (): Record<string, never> {
    return {};
};

/**
 * Toggles a truthy value to its opposite boolean value.
 */
export const toggleTruthy = function <T>(value: T): boolean {
    return !value;
};
