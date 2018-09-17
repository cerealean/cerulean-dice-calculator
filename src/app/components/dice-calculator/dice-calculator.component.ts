import { Component, HostListener } from '@angular/core';
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

  private get isMobileMode(){
    const calculatorElement = document.getElementById('calculator');
    const isDesktopCalculatorHidden = calculatorElement.offsetParent === null;

    return isDesktopCalculatorHidden;
  }

  private readonly stringDiceCalculator = new StringDiceCalculator();

  constructor(){

  }

  public AddCharacter(char: string): void {
    const isContinuingFromLastCalculation = this.IsSpecialCharacter(char) && this.equalsKeyHit === true;
    const isInputtingTwoSpecialCharactersInARow = this.IsSpecialCharacter(char) && this.IsSpecialCharacter(this.stringToCalculate.slice(-1));
    if (isInputtingTwoSpecialCharactersInARow) {
      return;
    }
    else if(isContinuingFromLastCalculation){
      this.stringToCalculate = this.output;
      this.equalsKeyHit = false;
    }
    else if (this.equalsKeyHit === true) {
      this.equalsKeyHit = false;
      this.stringToCalculate = "";
      this.output = "";
    }
    this.stringToCalculate += char;
    if(!this.isMobileMode){
      this.output += char;
    }
    this.equalsKeyHit = false;
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
      result = this.stringDiceCalculator.CalculateFromString(this.previousStringToCalculate);
      this.output = result.toString();
    }
    else {
      this.previousStringToCalculate = this.stringToCalculate;
      result = this.stringDiceCalculator.CalculateFromString(this.stringToCalculate);
      this.output = result.toString();
      this.equalsKeyHit = true;
    }
  }

  @HostListener('document:keypress', ['$event'])
  private HandleKeyboardInput(event:KeyboardEvent){
    const allowedCharacters = /[0-9]|(d|D|\.|\+|\-|\*|\/)/;
    const returnKeyCode = 13;
    console.log("Key pressed is ", event.key);

    if(allowedCharacters.test(event.key)){
      if(event.key === "d"){
        this.AddCharacter("D");
      }
      else{
        this.AddCharacter(event.key);
      }
    }
    else if(event.which === returnKeyCode){
      this.Calculate();
    }
  }

  private IsSpecialCharacter(char: string): boolean {
    return this.specialCharacters.indexOf(char) != -1;
  }
}
