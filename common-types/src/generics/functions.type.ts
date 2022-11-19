/**
 * Represents a function that accepts one argument and produces a result.
 */
export type Function<T, R> = (arg1 : T) => R;

/**
 * Represents a supplier of results.
 */
export type Supplier<T> = () => T;

/**
 * Represents an operation on a single operand that produces a result of the
 * same type as its operand. This is a specialization of Function for the case
 * where the operand and result are of the same type.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type UnaryOperator<T> = Function<T, T>;
