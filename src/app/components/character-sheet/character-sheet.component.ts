import { Component, OnInit, Input, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Character } from '../../models/character';
import { AbilityScoreName } from '../../enums/ability-score-name';
import { races } from '../../resources/races';
import { classes } from '../../resources/classes';
import { AlignmentName } from '../../enums/alignment-name';
import { items } from '../../resources/items';
import { Item } from '../../models/item';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss']
})
export class CharacterSheetComponent implements OnInit {
  public AbilityScoreName = AbilityScoreName;
  public AlignmentName = AlignmentName;
  public races = races;
  public classes = classes;
  public items = items;
  @Input() character?: Character;

  @ViewChild('itemInput') itemInputElement: ElementRef<HTMLInputElement>;

  constructor() { }

  ngOnInit() {
    if (!this.character) {
      this.character = new Character();
      this.character.race = this.races[0];
      this.character.class = this.classes[0];
    }
  }

  @HostListener('document:keydown', ['$event'])
  onkeypress($event: KeyboardEvent) {
    if ($event.ctrlKey && $event.key.toLowerCase() === 's') {
      console.log(this.character);
      $event.preventDefault();
      return false;
    }
  }

  getAbilityScoreValue(name: AbilityScoreName): number {
    return this.character.getAbilityScoreValue(name);
  }

  getAbilityScoreModifier(name: AbilityScoreName): number {
    return this.character.getAbilityScoreModifier(name);
  }

  setAbilityScoreValue($event: KeyboardEvent | MouseEvent, name: AbilityScoreName): void {
    const value = (<HTMLInputElement>$event.target).value;
    const numericExpression = new RegExp(/[0-9]/g);
    if (!value || !numericExpression.test(value)) {
      throw new Error('Invalid entry: ' + value);
    }
    this.character.setAbilityScoreValue(name, Number(value));
  }

  addItem(itemName: string, itemInput: HTMLInputElement){
    const itemToAdd = this.items.find(item => item.name === itemName);
    if(!itemToAdd){
      throw new Error(`Item ${itemName} not found`);
    }
    this.character.items.push(itemToAdd);
    this.itemInputElement.nativeElement.value = "";
  }

}
