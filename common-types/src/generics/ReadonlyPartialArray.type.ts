import { ReadonlyPartial } from './ReadonlyPartial.type';

/**
 * @deprecated Use `ImmutableArray<Partial<T>>` instead.
 */
export type ReadonlyPartialArray<T> = ReadonlyArray<ReadonlyPartial<T>>;
