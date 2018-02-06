import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './dice-calculator.component.html',
  styleUrls: ['./dice-calculator.component.scss']
})
export class DiceCalculatorComponent {
  specialCharacters:string[] = ["D","/","+","-","x"];
  stringToCalculate:string = "";

  public AddCharacter(char:string):void{
    if(this.IsSpecialCharacter(char) && this.IsSpecialCharacter(this.stringToCalculate.slice(-1))){
      return;
    }
    this.stringToCalculate+=char;
  }

  public Clear():void{
    this.stringToCalculate = "";
  }

  private IsSpecialCharacter(char:string):boolean{
    return this.specialCharacters.indexOf(char) != -1;
  }
}
