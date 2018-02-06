import { Component, OnInit } from '@angular/core';
import { StringDiceCalculator } from '../../string-dice-calculator/string-dice-calculator';

@Component({
  templateUrl: './dice-calculator.component.html',
  styleUrls: ['./dice-calculator.component.scss']
})
export class DiceCalculatorComponent {
  specialCharacters: string[] = ["D", "/", "+", "-", "*"];
  output:string = "0";
  stringToCalculate: string = "";
  previousStringToCalculate: string = "";
  equalsKeyHit: boolean = true;

  public AddCharacter(char: string): void {
    if (this.equalsKeyHit === true) {
      this.equalsKeyHit = false;
      this.stringToCalculate = "";
      this.output = "";
    }
    if (this.IsSpecialCharacter(char) && this.IsSpecialCharacter(this.stringToCalculate.slice(-1))) {
      return;
    }
    this.stringToCalculate += char;
    this.output += char;
  }

  public Clear(): void {
    this.previousStringToCalculate = "";
    this.stringToCalculate = "";
    this.output = "";
    this.equalsKeyHit = false;
  }

  public Calculate(): void {
    let result:number = 0;
    if(!this.stringToCalculate && !this.previousStringToCalculate){
      this.output = "0";
    }
    else if (this.equalsKeyHit === true && this.previousStringToCalculate) {
      result = new StringDiceCalculator().CalculateFromString(this.previousStringToCalculate);
      this.output = this.stringToCalculate + "=" + result;
    }
    else {
      this.previousStringToCalculate = this.stringToCalculate;
      result = new StringDiceCalculator().CalculateFromString(this.stringToCalculate);
      this.output = this.stringToCalculate + "=" + result;
      this.equalsKeyHit = true;
    }
  }

  private IsSpecialCharacter(char: string): boolean {
    return this.specialCharacters.indexOf(char) != -1;
  }
}
