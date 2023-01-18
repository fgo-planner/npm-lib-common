import { ObjectUtils } from '../../src/utils';

describe('ObjectUtils.isShallowEquals', () => {

    it('should return true for two empty objects', () => {
        const a = {};

        const b = {};

        const result = ObjectUtils.isShallowEquals(a, b);
        expect(result).toStrictEqual(true);
    });

    it('should return true for an empty object and an object with a single key', () => {
        const a = {};

        const b = {
            hello: 'world'
        };

        const result = ObjectUtils.isShallowEquals(a, b);
        expect(result).toStrictEqual(false);
    });

    it('should return false for an two objects with different keys', () => {
        const a = {
            a: 1
        };

        const b = {
            b: 1
        };

        const result = ObjectUtils.isShallowEquals(a, b);
        expect(result).toStrictEqual(false);
    });

    it('should return true for an two objects with same keys and same values', () => {
        const a = {
            a: 1,
            b: 2
        };

        const b = {
            b: 2,
            a: 1
        };

        const result = ObjectUtils.isShallowEquals(a, b);
        expect(result).toStrictEqual(true);
    });

    it('should return false for an two objects with same keys but different values', () => {
        const a = {
            a: 1,
            b: 2
        };

        const b = {
            a: 3,
            b: 4
        };

        const result = ObjectUtils.isShallowEquals(a, b);
        expect(result).toStrictEqual(false);
    });

    it('should return true for an two objects with same keys and same object references', () => {
        const obj1 = [] as Array<any>;
        const obj2 = {};

        const a = {
            a: obj1,
            b: obj2
        };

        const b = {
            a: obj1,
            b: obj2
        };

        const result = ObjectUtils.isShallowEquals(a, b);
        expect(result).toStrictEqual(true);
    });

    it('should return false for an two objects with same keys but different object references', () => {
        const a = {
            a: {},
            b: []
        };

        const b = {
            a: {},
            b: []
        };

        const result = ObjectUtils.isShallowEquals(a, b);
        expect(result).toStrictEqual(false);
    });

    it('should return true for an two objects with same date values', () => {
        const a = {
            a: new Date(1665262000000)
        };

        const b = {
            a: new Date(1665262000000)
        };

        const result = ObjectUtils.isShallowEquals(a, b);
        expect(result).toStrictEqual(true);
    });

    it('should return false for an two objects with different date values', () => {
        const a = {
            a: new Date(1665262000000)
        };

        const b = {
            a: new Date(1665123000000)
        };

        const result = ObjectUtils.isShallowEquals(a, b);
        expect(result).toStrictEqual(false);
    });

});
