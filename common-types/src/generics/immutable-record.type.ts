import { Immutable } from './immutable.type';
import { ReadonlyRecord } from './readonly-record.type';

/**
 * Readonly record of `Immutable` typed objects.
 */
export type ImmutableRecord<K extends keyof any, V> = ReadonlyRecord<K, Immutable<V>>;
