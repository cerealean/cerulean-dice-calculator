import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiceCalculatorComponent } from './components/dice-calculator/dice-calculator.component';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dice-calculator',
    pathMatch: "full"
  },
  {
    path: 'dice-calculator',
    component: DiceCalculatorComponent
  },
  {
    path: 'currency-converter',
    component: CurrencyConverterComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
