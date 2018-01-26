import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiceCalculatorComponent } from './components/dice-calculator/dice-calculator.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dice-calculator',
    pathMatch: "full"
  },
  {
    path: 'dice-calculator',
    component: DiceCalculatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
