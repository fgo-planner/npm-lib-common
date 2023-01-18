import { StringUtils } from '../../src/utils';

describe('StringUtils.normalizeDiacritic', () => {

    it('should return empty string when given an empty string', () => {
        const str = '';
        const result = StringUtils.normalizeDiacritic(str);
        expect(result).toStrictEqual('');
    });

    const blankString = '    ';

    it(`should return '${blankString}' when given '${blankString}'`, () => {
        const result = StringUtils.normalizeDiacritic(blankString);
        expect(result).toStrictEqual(blankString);
    });

    const melusine = 'Melusine';
    const melusineWithDiacritic = 'Mélusine';

    it(`should return '${melusine}' when given '${melusine}'`, () => {
        const result = StringUtils.normalizeDiacritic(melusine);
        expect(result).toStrictEqual(melusine);
    });

    it(`should return '${melusine}' when given '${melusineWithDiacritic}'`, () => {
        const result = StringUtils.normalizeDiacritic(melusineWithDiacritic);
        expect(result).toStrictEqual(melusine);
    });

});
