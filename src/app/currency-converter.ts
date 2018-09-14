import { CurrencyTypes } from "./enums/currency-type";
import { Currency } from "./models/currency";
import { ArgumentError } from "./errors/argument-error";

export class CurrencyConverter {
    private value: number;
    private type: CurrencyTypes;
    private conversionRates: Map<CurrencyTypes, Map<CurrencyTypes, number>> = new Map([
        [CurrencyTypes.Copper, new Map<CurrencyTypes, number>([
            [CurrencyTypes.Copper, 1],
            [CurrencyTypes.Silver, 10],
            [CurrencyTypes.Electrum, 50],
            [CurrencyTypes.Gold, 100],
            [CurrencyTypes.Platinum, 1000],
        ])],
        [CurrencyTypes.Silver, new Map<CurrencyTypes, number>([
            [CurrencyTypes.Copper, 1 / 10],
            [CurrencyTypes.Silver, 1],
            [CurrencyTypes.Electrum, 5],
            [CurrencyTypes.Gold, 10],
            [CurrencyTypes.Platinum, 100],
        ])],
        [CurrencyTypes.Electrum, new Map<CurrencyTypes, number>([
            [CurrencyTypes.Copper, 1 / 50],
            [CurrencyTypes.Silver, 1 / 5],
            [CurrencyTypes.Electrum, 1],
            [CurrencyTypes.Gold, 2],
            [CurrencyTypes.Platinum, 20],
        ])],
        [CurrencyTypes.Gold, new Map<CurrencyTypes, number>([
            [CurrencyTypes.Copper, 1 / 100],
            [CurrencyTypes.Silver, 1 / 10],
            [CurrencyTypes.Electrum, 1 / 2],
            [CurrencyTypes.Gold, 1],
            [CurrencyTypes.Platinum, 10],
        ])],
        [CurrencyTypes.Platinum, new Map<CurrencyTypes, number>([
            [CurrencyTypes.Copper, 1 / 1000],
            [CurrencyTypes.Silver, 1 / 100],
            [CurrencyTypes.Electrum, 1 / 20],
            [CurrencyTypes.Gold, 1 / 10],
            [CurrencyTypes.Platinum, 1],
        ])]
    ]);

    convert(value: number, currencyType: CurrencyTypes) {
        if(value < 0){
            throw new ArgumentError('value to convert must not be negative'); 
        }
        this.value = value;
        this.type = currencyType;

        return this;
    }

    to(type: CurrencyTypes) {
        const currency = new Currency();
        const conversionRate = this.conversionRates.get(this.type).get(type);
        let convertedValue = this.divide(this.value, conversionRate);
        const remainder = this.getRemainder(convertedValue);
        if (remainder !== 0 && type != CurrencyTypes.Copper) {
            convertedValue = Math.floor(convertedValue);
            const downType = this.getPreviousCurrencyType(type);
            const remainderCurrency = new CurrencyConverter().convert(remainder, type).to(downType);
            currency.add(remainderCurrency);
        }
        currency.setCurrencyValue(type, convertedValue); 

        return currency;
    }

    /**
     * @description Divide two numbers. Once again because of JavaScript's floating point math problems.
     * @param numerator number
     * @param denominator number
     */
    private divide(numerator: number, denominator: number): number {
        return (numerator * 1000) / (denominator * 1000);
    }

    /**
     * @description Gets the remainder of a number. Unfortunately, because of floating point math, JavaScript modulus operator does not behave properly sometimes.
     * @param value number
     */
    private getRemainder(value: number): number {
        return ((value * 1000) % 1000) / 1000;
    }

    private getPreviousCurrencyType(type: CurrencyTypes): CurrencyTypes {
        switch (type) {
            case CurrencyTypes.Silver:
                return CurrencyTypes.Copper;
            case CurrencyTypes.Electrum:
                return CurrencyTypes.Silver;
            case CurrencyTypes.Gold:
                return CurrencyTypes.Electrum;
            case CurrencyTypes.Platinum:
                return CurrencyTypes.Gold;
            default:
                throw new Error(`Cannot get previous currency type for ${type}`);
        }
    }
}
