import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HoverClassDirective } from './directives/hover-class/hover-class.directive';
import { DiceCalculatorComponent } from './components/dice-calculator/dice-calculator.component';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';


@NgModule({
  declarations: [
    AppComponent,
    HoverClassDirective,
    DiceCalculatorComponent,
    CurrencyConverterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
