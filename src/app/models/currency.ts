import { CurrencyTypes } from "../enums/currency-type";

export class Currency {
    constructor(public copper = 0, public silver = 0, public electrum = 0, public gold = 0, public platinum = 0) { }

    public setCurrencyValue(type: CurrencyTypes, value: number) {
        switch (type) {
            case CurrencyTypes.Copper:
                this.copper = value;
                break;
            case CurrencyTypes.Silver:
                this.silver = value;
                break;
            case CurrencyTypes.Electrum:
                this.electrum = value;
                break;
            case CurrencyTypes.Gold:
                this.gold = value;
                break;
            case CurrencyTypes.Platinum:
                this.platinum = value;
                break;
            default:
                throw new Error(`Currency type ${type} not valid`);
        }
    }

    public add(currency: Currency){
        this.copper += currency.copper;
        this.silver += currency.silver;
        this.electrum += currency.electrum;
        this.gold += currency.gold;
        this.platinum += currency.platinum;
    }
}