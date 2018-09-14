import { CurrencyConverter } from './currency-converter';
import { CurrencyTypes } from './enums/currency-type';
import { Currency } from './models/currency';
import { ArgumentError } from './errors/argument-error';

fdescribe('CurrencyConverter', () => {
  it('should create an instance', () => {
    expect(new CurrencyConverter()).toBeTruthy();
  });

  describe('Convert', () => {
    it('should return an instance of CurrencyConverter', () => {
      expect(new CurrencyConverter().convert(1, CurrencyTypes.Copper)).toEqual(jasmine.any(CurrencyConverter));
    });

    it('should throw ArgumentError when given negative number', () => {
      const methodToTest = function(){
        new CurrencyConverter().convert(-5, CurrencyTypes.Copper);
      };
      expect(methodToTest).toThrowError(ArgumentError);
    });

    describe('To', () => {
      describe('When converting up', () => {
        it('should return 10 copper if converting 10 copper to copper', () => {
          const valueToConvert = 10;
          const expected = new Currency(10);
          expect(new CurrencyConverter().convert(valueToConvert, CurrencyTypes.Copper).to(CurrencyTypes.Copper)).toEqual(expected);
        });

        it('should return 12 copper if converting 12 copper to copper', () => {
          const valueToConvert = 12;
          const expected = new Currency(12);
          expect(new CurrencyConverter().convert(valueToConvert, CurrencyTypes.Copper).to(CurrencyTypes.Copper)).toEqual(expected);
        });

        it('should return 1 silver 2 copper if converting 12 copper to silver', () => {
          const valueToConvert = 12;
          const typeToConvertFrom = CurrencyTypes.Copper;
          const typeToConvertTo = CurrencyTypes.Silver;
          const expected = new Currency(2, 1);

          const actual = new CurrencyConverter().convert(valueToConvert, typeToConvertFrom).to(typeToConvertTo);

          expect(expected).toEqual(actual);
        });

        it('should return 2 silver 9 copper if converting 29 copper to silver', () => {
          const valueToConvert = 29;
          const typeToConvertFrom = CurrencyTypes.Copper;
          const typeToConvertTo = CurrencyTypes.Silver;
          const expected = new Currency(9, 2);

          const actual = new CurrencyConverter().convert(valueToConvert, typeToConvertFrom).to(typeToConvertTo);

          expect(expected).toEqual(actual);
        });

        it('should return 4 electrum if converting 20 silver to electrum', () => {
          const valueToConvert = 20;
          const typeToConvertFrom = CurrencyTypes.Silver;
          const typeToConvertTo = CurrencyTypes.Electrum;
          const expected = new Currency(0, 0, 4);

          const actual = new CurrencyConverter().convert(valueToConvert, typeToConvertFrom).to(typeToConvertTo);

          expect(expected).toEqual(actual);
        });

        it('should return 2 gold if converting 20 silver to gold', () => {
          const valueToConvert = 20;
          const typeToConvertFrom = CurrencyTypes.Silver;
          const typeToConvertTo = CurrencyTypes.Gold;
          const expected = new Currency(0, 0, 0, 2);

          const actual = new CurrencyConverter().convert(valueToConvert, typeToConvertFrom).to(typeToConvertTo);

          expect(expected).toEqual(actual);
        });

        it('should return 2 gold 1 electrum if converting 25 silver to gold', () => {
          const valueToConvert = 25;
          const typeToConvertFrom = CurrencyTypes.Silver;
          const typeToConvertTo = CurrencyTypes.Gold;
          const expected = new Currency(0, 0, 1, 2);

          const actual = new CurrencyConverter().convert(valueToConvert, typeToConvertFrom).to(typeToConvertTo);

          expect(expected).toEqual(actual);
        });

        it('should return 2 gold if converting 4 electrum to gold', () => {
          const valueToConvert = 4;
          const typeToConvertFrom = CurrencyTypes.Electrum;
          const typeToConvertTo = CurrencyTypes.Gold;
          const expected = new Currency(0, 0, 0, 2);

          const actual = new CurrencyConverter().convert(valueToConvert, typeToConvertFrom).to(typeToConvertTo);

          expect(expected).toEqual(actual);
        });

        it('should return 1 platinum if converting 10 gold to platinum', () => {
          const valueToConvert = 10;
          const typeToConvertFrom = CurrencyTypes.Gold;
          const typeToConvertTo = CurrencyTypes.Platinum;
          const expected = new Currency(0, 0, 0, 0, 1);

          const actual = new CurrencyConverter().convert(valueToConvert, typeToConvertFrom).to(typeToConvertTo);

          expect(expected).toEqual(actual);
        });

        it('should return 1 platinum, 3 gold if converting 1300 copper to platinum', () => {
          const valueToConvert = 1300;
          const typeToConvertFrom = CurrencyTypes.Copper;
          const typeToConvertTo = CurrencyTypes.Platinum;
          const expected = new Currency(0, 0, 0, 3, 1);

          const actual = new CurrencyConverter().convert(valueToConvert, typeToConvertFrom).to(typeToConvertTo);

          expect(expected).toEqual(actual);
        });

        it('should return 1 platinum, 3 gold, 1 electrum if converting 1350 copper to platinum', () => {
          const valueToConvert = 1350;
          const typeToConvertFrom = CurrencyTypes.Copper;
          const typeToConvertTo = CurrencyTypes.Platinum;
          const expected = new Currency(0, 0, 1, 3, 1);

          const actual = new CurrencyConverter().convert(valueToConvert, typeToConvertFrom).to(typeToConvertTo);

          expect(expected).toEqual(actual);
        });

        it('should return 1 platinum, 3 gold, 4 silver, 5 copper if converting 1345 copper to platinum', () => {
          const valueToConvert = 1345;
          const typeToConvertFrom = CurrencyTypes.Copper;
          const typeToConvertTo = CurrencyTypes.Platinum;
          const expected = new Currency(5, 4, 0, 3, 1);

          const actual = new CurrencyConverter().convert(valueToConvert, typeToConvertFrom).to(typeToConvertTo);

          expect(expected).toEqual(actual);
        });
      });

      describe('When converting down', () => {
        it('should return 100 copper if converting 1 gold to copper', () => {
          const valueToConvert = 1;
          const typeToConvertFrom = CurrencyTypes.Gold;
          const typeToConvertTo = CurrencyTypes.Copper;
          const expected = new Currency(100);

          const actual = new CurrencyConverter().convert(valueToConvert, typeToConvertFrom).to(typeToConvertTo);

          expect(expected).toEqual(actual);
        });
        
        it('should return 1000 copper if converting 1 platinum to copper', () => {
          const valueToConvert = 1;
          const typeToConvertFrom = CurrencyTypes.Platinum;
          const typeToConvertTo = CurrencyTypes.Copper;
          const expected = new Currency(1000);

          const actual = new CurrencyConverter().convert(valueToConvert, typeToConvertFrom).to(typeToConvertTo);

          expect(expected).toEqual(actual);
        });

        it('should return 50 copper if converting 1 electrum to copper', () => {
          const valueToConvert = 1;
          const typeToConvertFrom = CurrencyTypes.Electrum;
          const typeToConvertTo = CurrencyTypes.Copper;
          const expected = new Currency(50);

          const actual = new CurrencyConverter().convert(valueToConvert, typeToConvertFrom).to(typeToConvertTo);

          expect(expected).toEqual(actual);
        });

        it('should return 10 copper if converting 1 silver to copper', () => {
          const valueToConvert = 1;
          const typeToConvertFrom = CurrencyTypes.Silver;
          const typeToConvertTo = CurrencyTypes.Copper;
          const expected = new Currency(10);

          const actual = new CurrencyConverter().convert(valueToConvert, typeToConvertFrom).to(typeToConvertTo);

          expect(expected).toEqual(actual);
        });

        it('should return 5 silver if converting 1 electrum to silver', () => {
          const valueToConvert = 1;
          const typeToConvertFrom = CurrencyTypes.Electrum;
          const typeToConvertTo = CurrencyTypes.Silver;
          const expected = new Currency(0, 5);

          const actual = new CurrencyConverter().convert(valueToConvert, typeToConvertFrom).to(typeToConvertTo);

          expect(expected).toEqual(actual);
        });

        it('should return 2 electrum if converting 1 gold to electrum', () => {
          const valueToConvert = 1;
          const typeToConvertFrom = CurrencyTypes.Gold;
          const typeToConvertTo = CurrencyTypes.Electrum;
          const expected = new Currency(0, 0, 2);

          const actual = new CurrencyConverter().convert(valueToConvert, typeToConvertFrom).to(typeToConvertTo);

          expect(expected).toEqual(actual);
        });

        it('should return 10 gold if converting 1 platinum to gold', () => {
          const valueToConvert = 1;
          const typeToConvertFrom = CurrencyTypes.Platinum;
          const typeToConvertTo = CurrencyTypes.Gold;
          const expected = new Currency(0, 0, 0, 10);

          const actual = new CurrencyConverter().convert(valueToConvert, typeToConvertFrom).to(typeToConvertTo);

          expect(expected).toEqual(actual);
        });

        it('should return 10 platinum if converting 10 platinum to platinum', () => {
          const valueToConvert = 10;
          const typeToConvertFrom = CurrencyTypes.Platinum;
          const typeToConvertTo = CurrencyTypes.Platinum;
          const expected = new Currency(0, 0, 0, 0, 10);

          const actual = new CurrencyConverter().convert(valueToConvert, typeToConvertFrom).to(typeToConvertTo);

          expect(expected).toEqual(actual);
        });

        it('should return 10000 silver if converting 100 platinum to silver', () => {
          const valueToConvert = 100;
          const typeToConvertFrom = CurrencyTypes.Platinum;
          const typeToConvertTo = CurrencyTypes.Silver;
          const expected = new Currency(0, 10000);

          const actual = new CurrencyConverter().convert(valueToConvert, typeToConvertFrom).to(typeToConvertTo);

          expect(expected).toEqual(actual);
        });

      });
    });
  })
});
