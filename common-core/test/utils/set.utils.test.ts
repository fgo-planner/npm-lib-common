import { SetUtils } from '../../src/utils';

describe('SetUtils.isEqual', () => {

    it('should return true for the same set', () => {
        const a = new Set([1, 2, 3]);
        const b = a;

        const result = SetUtils.isEqual(a, b);

        expect(result).toStrictEqual(true);
    });

    it('should return true for two empty sets', () => {
        const a = new Set();
        const b = new Set();

        const result = SetUtils.isEqual(a, b);

        expect(result).toStrictEqual(true);
    });

    it('should return true for two sets with same contents', () => {
        const a = new Set([1, 2, 3]);
        const b = new Set([1, 2, 3]);

        const result = SetUtils.isEqual(a, b);

        expect(result).toStrictEqual(true);
    });

    it('should return false for two sets with same contents but in different order', () => {
        const a = new Set([1, 2, 3]);
        const b = new Set([3, 1, 2]);

        const result = SetUtils.isEqual(a, b);

        expect(result).toStrictEqual(true);
    });

    it('should return false for two sets of different sizes', () => {
        const a = new Set([1, 2, 3]);
        const b = new Set([1, 2]);

        const result = SetUtils.isEqual(a, b);

        expect(result).toStrictEqual(false);
    });

    it('should return false for two sets with different content', () => {
        const a = new Set([1, 2, 3]);
        const b = new Set([1, 2, 4]);

        const result = SetUtils.isEqual(a, b);

        expect(result).toStrictEqual(false);
    });

});
