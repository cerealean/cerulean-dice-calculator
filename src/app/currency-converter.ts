import { CurrencyTypes } from "./enums/currency-type";

export class CurrencyConverter {
    private value: number;
    private type: CurrencyTypes;
    private conversionRates: Map<CurrencyTypes, Map<CurrencyTypes, number>> = new Map([
        [CurrencyTypes.Copper, new Map<CurrencyTypes, number>([
            [CurrencyTypes.Copper, 1],
            [CurrencyTypes.Silver, 10],
            [CurrencyTypes.Electrum, 50],
            [CurrencyTypes.Gold, 100],
            [CurrencyTypes.Silver, 1000],
        ])],
        [CurrencyTypes.Silver, new Map<CurrencyTypes, number>([
            
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
