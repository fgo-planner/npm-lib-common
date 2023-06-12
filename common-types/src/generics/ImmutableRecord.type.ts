import { Immutable } from './Immutable.type';
import { ReadonlyRecord } from './ReadonlyRecord.type';

/**
 * Readonly record of `Immutable` typed objects.
 */
export type ImmutableRecord<K extends keyof any, V> = ReadonlyRecord<K, Immutable<V>>;
