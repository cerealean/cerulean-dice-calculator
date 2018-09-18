import { Component } from '@angular/core';
import { CurrencyTypes } from '../../enums/currency-type';
import { Currency } from '../../models/currency';
import { CurrencyConverter } from './currency-converter';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent {
  public CurrencyTypesEnum = CurrencyTypes;
  public convertTo = CurrencyTypes.Copper;
  public convertFrom = CurrencyTypes.Copper;
  public conversionValue: number;
  public result: Currency;

  constructor() { }

  public calculate() {
    this.result = new CurrencyConverter().convert(this.conversionValue || 0, Number(this.convertFrom)).to(Number(this.convertTo));
  }

}
