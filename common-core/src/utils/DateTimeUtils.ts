import { Immutable, ReadonlyDate } from '@fgo-planner/common-types';
import { millisecondsInSecond, secondsInMinute } from 'date-fns';

type DateParam = Date | ReadonlyDate | Readonly<Date> | Immutable<Date>;

export function cloneDate(date: DateParam | undefined): Date | undefined {
    return date ? new Date(date as Date) : undefined;
}

export function getTime(date: DateParam | string | undefined): number | undefined {
    if (!date) {
        return undefined;
    }
    if (typeof date === 'string') {
        const time = new Date(date).getTime();
        return isNaN(time) ? undefined : time;
    }
    return date ? (date as Date).getTime() : undefined;
}

/**
 * Truncates a `Date` such that its least significate unit is the date. In other
 * words, this sets the date's hours, minutes, seconds, and milliseconds all to
 * zero. A new `Date` instance is always returned.
 */
export function truncateToDate(date: DateParam | number): Date {
    const result = new Date(date as Date | number);
    // TODO Maybe use a library for this.
    result.setHours(0);
    result.setMinutes(0);
    result.setSeconds(0);
    result.setMilliseconds(0);
    return result;
}

export function utcToZonedTime(date: DateParam | number): Date {
    if (typeof date === 'number') {
        date = new Date(date);
    }
    const milliseconds = (date as Date).getTime() + (date as Date).getTimezoneOffset() * secondsInMinute * millisecondsInSecond;
    return new Date(milliseconds);
}

export function zonedToUtcTime(date: DateParam | number): Date {
    if (typeof date === 'number') {
        date = new Date(date);
    }
    const milliseconds = (date as Date).getTime() - (date as Date).getTimezoneOffset() * secondsInMinute * millisecondsInSecond;
    return new Date(milliseconds);
}

export function getLocalTimeZone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
