import { CurrencyConverter } from './currency-converter';
import { CurrencyTypes } from './enums/currency-type';

fdescribe('CurrencyConverter', () => {
  it('should create an instance', () => {
    expect(new CurrencyConverter()).toBeTruthy();
  });

  describe('Convert', () => {
    it('should return an instance of CurrencyConverter', () => {
      expect(new CurrencyConverter().convert(1, CurrencyTypes.Copper)).toEqual(jasmine.any(CurrencyConverter));
    });

    describe('To', () => {
      it('should return 10 if coverting 10 copper to copper', () => {
        const expected = 10;
        expect(new CurrencyConverter().convert(expected, CurrencyTypes.Copper).to(CurrencyTypes.Copper)).toBe(expected);
      });
      
      it('should return 12 if coverting 12 copper to copper', () => {
        const expected = 12;
        expect(new CurrencyConverter().convert(expected, CurrencyTypes.Copper).to(CurrencyTypes.Copper)).toBe(expected);
      });

    });
  })
});
