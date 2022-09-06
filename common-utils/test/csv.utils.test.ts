import * as CsvUtils from '../src/csv.utils';

describe('CsvUtils.parse', () => {

    it('should return empty array for empty input', () => {

        const csv = '';

        const result = CsvUtils.parse(csv);

        expect(result).toBeDefined();
        expect(result.length).toStrictEqual(0);
    });

    it('should return an array for a valid input', () => {

        const csv = 
            'General Information,,,,,Deck,,,,,,NP,,,Levels,,Skills,,,Fou,,Bond,,Extra\n' +
            'Name,R,Class,Attr.,Availability,C1,C2,C3,C4,C5,isMaxAscended,Type,Target,Damage,NP,Level,1,2,3,HP,ATK,Bond,BP,Acquisition\n' +
            'Mash Kyrielight,4*,Shielder,Earth,Welfare,B,B,A,A,Q,TRUE,Arts,Support,,NP3,Lv. 80,10,10,10,1000,1000,5,,2019. 07. 08.';

        const result = CsvUtils.parse(csv);

        expect(result).toBeDefined();
        expect(result.length).toStrictEqual(3);
        expect(result[0][0]).toStrictEqual('General Information');
        expect(result[0][1]).toStrictEqual('');
        expect(result[1][23]).toStrictEqual('Acquisition');
        expect(result[2][23]).toStrictEqual('2019. 07. 08.');
    });

    it('should return an array for a valid input with empty lines', () => {

        const csv = 
            'General Information,,,,,Deck,,,,,,NP,,,Levels,,Skills,,,Fou,,Bond,,Extra\n' +
            '\n' +
            'Name,R,Class,Attr.,Availability,C1,C2,C3,C4,C5,isMaxAscended,Type,Target,Damage,NP,Level,1,2,3,HP,ATK,Bond,BP,Acquisition\n' +
            'Mash Kyrielight,4*,Shielder,Earth,Welfare,B,B,A,A,Q,TRUE,Arts,Support,,NP3,Lv. 80,10,10,10,1000,1000,5,,2019. 07. 08.' +
            '\n' +
            '\n' +
            '\n';

        const result = CsvUtils.parse(csv);

        expect(result).toBeDefined();
        expect(result.length).toStrictEqual(3);
        expect(result[0][0]).toStrictEqual('General Information');
        expect(result[0][1]).toStrictEqual('');
        expect(result[1][23]).toStrictEqual('Acquisition');
        expect(result[2][23]).toStrictEqual('2019. 07. 08.');
    });

});
