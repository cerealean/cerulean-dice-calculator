import { Component, OnInit } from '@angular/core';
import { StringDiceCalculator } from '../../string-dice-calculator/string-dice-calculator';

@Component({
  templateUrl: './dice-calculator.component.html',
  styleUrls: ['./dice-calculator.component.scss']
})
export class DiceCalculatorComponent {
  specialCharacters: string[] = ["D", "/", "+", "-", "x"];
  stringToCalculate: string = "";
  previousStringToCalculate: string = "";
  equalsKeyHit: boolean = false;

  public AddCharacter(char: string): void {
    if (this.equalsKeyHit === true) {
      this.equalsKeyHit = false;
      this.stringToCalculate = "";
    }
    if (this.IsSpecialCharacter(char) && this.IsSpecialCharacter(this.stringToCalculate.slice(-1))) {
      return;
    }
    this.stringToCalculate += char;
  }

  public Clear(): void {
    this.stringToCalculate = "";
  }

  public Calculate(): void {
    if (this.equalsKeyHit === true) {
      this.stringToCalculate = new StringDiceCalculator().CalculateFromString(this.previousStringToCalculate).toString();
    }
    else {
      this.previousStringToCalculate = this.stringToCalculate;
      this.stringToCalculate = new StringDiceCalculator().CalculateFromString(this.stringToCalculate).toString();
      this.equalsKeyHit = true;
    }
  }

  private IsSpecialCharacter(char: string): boolean {
    return this.specialCharacters.indexOf(char) != -1;
  }
}
