import { Immutable } from '@fgo-planner/common-types';
import { millisecondsInSecond, secondsInMinute } from 'date-fns';

export function cloneDate(date: Date | Immutable<Date> | undefined): Date | undefined {
    return date ? new Date(date as Date) : undefined;
}

/**
 * Truncates a `Date` such that its least significate unit is the date. In other
 * words, this sets the date's hours, minutes, seconds, and milliseconds all to
 * zero. A new `Date` instance is always returned.
 */
export function truncateToDate(date: Date | number): Date {
    const result = new Date(date);
    // TODO Maybe use a library for this.
    result.setHours(0);
    result.setMinutes(0);
    result.setSeconds(0);
    result.setMilliseconds(0);
    return result;
}

export function utcToZonedTime(date: Date | number): Date {
    if (typeof date === 'number') {
        date = new Date(date);
    }
    const milliseconds = date.getTime() + date.getTimezoneOffset() * secondsInMinute * millisecondsInSecond;
    return new Date(milliseconds);
}

export function zonedToUtcTime(date: Date | number): Date {
    if (typeof date === 'number') {
        date = new Date(date);
    }
    const milliseconds = date.getTime() - date.getTimezoneOffset() * secondsInMinute * millisecondsInSecond;
    return new Date(milliseconds);
}

export function getLocalTimeZone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
