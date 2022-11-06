import { CollectionUtils } from '../../src/utils';

describe('CollectionUtils.emptySet', () => {

    it('should return an empty set', () => {
        const result = CollectionUtils.emptySet();

        expect(result).toBeDefined();
        expect(result.size).toStrictEqual(0);
    });

});

describe('CollectionUtils.newSet', () => {

    it('should return an empty set', () => {
        const result = CollectionUtils.newSet();

        expect(result).toBeDefined();
        expect(result.size).toStrictEqual(0);
    });

});

describe('CollectionUtils.isSetsEqual', () => {

    it('should return true for the same set', () => {
        const a = new Set([1, 2, 3]);
        const b = a;

        const result = CollectionUtils.isSetsEqual(a, b);

        expect(result).toStrictEqual(true);
    });

    it('should return true for two empty sets', () => {
        const a = new Set();
        const b = new Set();

        const result = CollectionUtils.isSetsEqual(a, b);

        expect(result).toStrictEqual(true);
    });

    it('should return true for two sets with same contents', () => {
        const a = new Set([1, 2, 3]);
        const b = new Set([1, 2, 3]);

        const result = CollectionUtils.isSetsEqual(a, b);

        expect(result).toStrictEqual(true);
    });

    it('should return false for two sets with same contents but in different order', () => {
        const a = new Set([1, 2, 3]);
        const b = new Set([3, 1, 2]);

        const result = CollectionUtils.isSetsEqual(a, b);

        expect(result).toStrictEqual(true);
    });

    it('should return false for two sets of different sizes', () => {
        const a = new Set([1, 2, 3]);
        const b = new Set([1, 2]);

        const result = CollectionUtils.isSetsEqual(a, b);

        expect(result).toStrictEqual(false);
    });

    it('should return false for two sets with different content', () => {
        const a = new Set([1, 2, 3]);
        const b = new Set([1, 2, 4]);

        const result = CollectionUtils.isSetsEqual(a, b);

        expect(result).toStrictEqual(false);
    });

});

describe('CollectionUtils.toReadonlyArray', () => {

    it('should return the same array instance for an array input', () => {
        const iterable = [1, 2, 3];
        const result = CollectionUtils.toReadonlyArray(iterable);

        expect(result).toBe(iterable);
    });

    it('should return an empty array for an empty Set input', () => {
        const iterable = new Set<number>();
        const result = CollectionUtils.toReadonlyArray(iterable);

        expect(result).toBeDefined();
        expect(result.length).toStrictEqual(0);
    });

    it('should return an equivalent array for an Set input', () => {
        const iterable = new Set<number>([1, 2, 3]);
        const result = CollectionUtils.toReadonlyArray(iterable);

        expect(result).toBeDefined();
        expect(result.length).toStrictEqual(3);
        expect(result[0]).toStrictEqual(1);
        expect(result[1]).toStrictEqual(2);
        expect(result[2]).toStrictEqual(3);
    });

});

describe('CollectionUtils.toReadonlySet', () => {

    it('should return the same Set instance for an Set input', () => {
        const iterable = new Set<number>([1, 2, 3]);
        const result = CollectionUtils.toReadonlySet(iterable);

        expect(result).toBe(iterable);
    });

    it('should return an empty Set for an empty array input', () => {
        const iterable = [] as ReadonlyArray<number>;
        const result = CollectionUtils.toReadonlySet(iterable);

        expect(result).toBeDefined();
        expect(result.size).toStrictEqual(0);
    });

    it('should return an equivalent Set for an array input', () => {
        const iterable = [1, 2, 3];
        const result = CollectionUtils.toReadonlySet(iterable);

        expect(result).toBeDefined();
        expect(result.size).toStrictEqual(3);
        expect(result.has(1)).toBeTruthy();
        expect(result.has(2)).toBeTruthy();
        expect(result.has(3)).toBeTruthy();

        // Check insertion order
        let index = 0;
        for (const value of result) {
            switch (index++) {
                case 0:
                    expect(value).toStrictEqual(1);
                    break;
                case 1:
                    expect(value).toStrictEqual(2);
                    break;
                case 2:
                    expect(value).toStrictEqual(3);
                    break;
            }
        }

    });

    it('should return an equivalent Set for an array input with duplicate values', () => {
        const iterable = [1, 2, 1, 3];
        const result = CollectionUtils.toReadonlySet(iterable);

        expect(result).toBeDefined();
        expect(result.size).toStrictEqual(3);
        expect(result.has(1)).toBeTruthy();
        expect(result.has(2)).toBeTruthy();
        expect(result.has(3)).toBeTruthy();

        // Check insertion order
        let index = 0;
        for (const value of result) {
            switch (index++) {
                case 0:
                    expect(value).toStrictEqual(1);
                    break;
                case 1:
                    expect(value).toStrictEqual(2);
                    break;
                case 2:
                    expect(value).toStrictEqual(3);
                    break;
            }
        }
    });

});
