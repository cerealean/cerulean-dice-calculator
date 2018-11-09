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
  public shouldShowItemsContextMenu = false;

  @Input() character?: Character;

  @ViewChild('itemInput') itemInputElement: ElementRef<HTMLInputElement>;
  @ViewChild('playerItems') playerItemsElement: ElementRef<HTMLSelectElement>;

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

  addItem(itemName: string, itemInput: HTMLInputElement) {
    const itemToAdd = this.items.find(item => item.name === itemName);
    if (!itemToAdd) {
      throw new Error(`Item ${itemName} not found`);
    }
    this.character.items.push(itemToAdd);
    this.itemInputElement.nativeElement.value = "";
  }

  removeItems(items: Item[]){
    console.log('Called remove items', items);
    const itemsExcludingRemoved = this.character.items.filter(x => !items.includes(x));
    this.character.resetItems(itemsExcludingRemoved);
    this.hideItemsContextMenu();
  }

  showItemsContextMenu($mouseEvent: MouseEvent) {
    $mouseEvent.preventDefault();
    this.shouldShowItemsContextMenu = true;
    setTimeout(() => {
      const menu = document.getElementById('item-context-menu');
      menu.style.position = 'fixed';
      menu.style.left = $mouseEvent.x.toString() + 'px';
      menu.style.top = $mouseEvent.y.toString() + 'px';
    }, 1);
  }

  hideItemsContextMenu(){
    this.shouldShowItemsContextMenu = false;
  }

  getSelectedItems() {
    //todo: get positions of elements to use for removal
    const selectedOptionElements = this.playerItemsElement.nativeElement.selectedOptions;
    let values = [];
    for (let element of Array.from(selectedOptionElements)) {
      values.push(element.value);
    }
    return values;
  }

}
