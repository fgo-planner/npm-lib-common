import { Immutable } from './immutable.type';

/**
 * Readonly array of `Immutable` typed objects.
 */
export type ImmutableArray<T> = ReadonlyArray<Immutable<T>>;
