import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Character } from '../../models/character';
import { AbilityScoreName } from '../../enums/ability-score-name';
import { races } from '../../resources/races';
import { classes } from '../../resources/classes';
import { AlignmentName } from '../../enums/alignment-name';

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
  @Input() character?: Character;

  constructor() { }

  ngOnInit() {
    if (!this.character) {
      this.character = new Character();
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

}
