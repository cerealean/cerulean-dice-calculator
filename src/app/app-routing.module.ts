import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiceCalculatorComponent } from './components/dice-calculator/dice-calculator.component';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { ChatComponent } from './components/chat/chat.component';
import { CharacterSheetComponent } from './components/character-sheet/character-sheet.component';

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
  },
  {
    path: 'create-character-sheet',
    component: CharacterSheetComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
