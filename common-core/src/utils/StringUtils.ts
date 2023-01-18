/**
 * Normalizes diacritics in the given string using the NFKD normalization form.
 */
export function normalizeDiacritic(str: string): string {
    if (!str) {
        return str;
    }
    const normalized = str.normalize('NFKD');
    if (str === normalized) {
        return str;
    }
    return normalized.replace(/\p{Diacritic}/gu, '');
}
