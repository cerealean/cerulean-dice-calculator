import { CurrencyTypes } from "./enums/currency-type";

export class CurrencyConverter {
    private value: number;
    private type: CurrencyTypes;
    private static conversionRates: Map<CurrencyTypes, Map<CurrencyTypes, number>> = new Map([
        [CurrencyTypes.Copper, new Map<CurrencyTypes, number>([
            [CurrencyTypes.Copper, 1],
            [CurrencyTypes.Silver, 10],
            [CurrencyTypes.Electrum, 50],
            [CurrencyTypes.Gold, 100],
            [CurrencyTypes.Silver, 1000],
        ])],
        [CurrencyTypes.Silver, new Map<CurrencyTypes, number>([
            [CurrencyTypes.Copper, 1/10],
            [CurrencyTypes.Silver, 1],
            [CurrencyTypes.Electrum, 5],
            [CurrencyTypes.Gold, 10],
            [CurrencyTypes.Silver, 100],
        ])],
        [CurrencyTypes.Electrum, new Map<CurrencyTypes, number>([
            [CurrencyTypes.Copper, 1/50],
            [CurrencyTypes.Silver, 1/5],
            [CurrencyTypes.Electrum, 1],
            [CurrencyTypes.Gold, 2],
            [CurrencyTypes.Silver, 20],
        ])],
        [CurrencyTypes.Gold, new Map<CurrencyTypes, number>([
            [CurrencyTypes.Copper, 1/100],
            [CurrencyTypes.Silver, 1/10],
            [CurrencyTypes.Electrum, 1/2],
            [CurrencyTypes.Gold, 1],
            [CurrencyTypes.Silver, 10],
        ])],
        [CurrencyTypes.Platinum, new Map<CurrencyTypes, number>([
            [CurrencyTypes.Copper, 1/1000],
            [CurrencyTypes.Silver, 1/100],
            [CurrencyTypes.Electrum, 1/20],
            [CurrencyTypes.Gold, 1/10],
            [CurrencyTypes.Silver, 1],
        ])]
    ]);

    convert(value: number, currencyType: CurrencyTypes){
        this.value = value;
        this.type = currencyType;
        return this;
    }

    to(type: CurrencyTypes){
        return this.value;
    }
}
