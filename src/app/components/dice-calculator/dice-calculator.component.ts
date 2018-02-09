import { Component, OnInit, HostListener } from '@angular/core';
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
    if(this.IsSpecialCharacter(char) && this.equalsKeyHit === true){
      this.output = this.stringToCalculate;
      this.equalsKeyHit = false;
    }
    else if (this.equalsKeyHit === true) {
      this.equalsKeyHit = false;
      this.stringToCalculate = "";
      this.output = "";
    }
    else if (this.IsSpecialCharacter(char) && this.IsSpecialCharacter(this.stringToCalculate.slice(-1))) {
      return;
    }
    this.stringToCalculate += char;
    this.output += char;
    this.equalsKeyHit = false;
    console.log("Output: " + this.output);
    console.log("stringtocalc: " + this.stringToCalculate);
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
      this.output = result.toString();
    }
    else {
      this.previousStringToCalculate = this.stringToCalculate;
      result = new StringDiceCalculator().CalculateFromString(this.stringToCalculate);
      this.output = result.toString();
      this.equalsKeyHit = true;
    }
  }

  @HostListener('document:keypress', ['$event'])
  private HandleKeyboardInput(event:KeyboardEvent){
    const allowedCharacters = /[0-9]|(d|D|\.|\+|\-|\*|\/)/;

    if(allowedCharacters.test(event.key)){
      if(event.key === "d"){
        this.AddCharacter("D");
      }
      else{
        this.AddCharacter(event.key);
      }
    }
    else if(event.which === 13){
      this.Calculate();
    }
  }

  private IsSpecialCharacter(char: string): boolean {
    return this.specialCharacters.indexOf(char) != -1;
  }
}
