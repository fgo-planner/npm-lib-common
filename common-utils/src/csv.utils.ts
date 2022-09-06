import { Array2D } from '@fgo-planner/common-types';
import { Options } from 'csv-parse';
import { parse as parseSync } from 'csv-parse/sync';

const DefaultParseOptions: Options = {
    delimiter: ',',
    skipEmptyLines: true
};

/**
 * Parses a CSV string into a 2D string array representing the rows and columns
 * of the CSV. Wraps the synchronous `parse` function from the `csv-parse`
 * library, and provides default option values that can be overridden.
 *
 * @param input CSV content.
 *
 * @param options (optional) CSV parse options. Uses default options if not
 * provided.
 *
 * @return A 2D string array representing the rows and columns of the parsed
 * CSV.
 */
export function parse(input: string, options = DefaultParseOptions): Array2D<string> {
    return parseSync(input, options);
}
