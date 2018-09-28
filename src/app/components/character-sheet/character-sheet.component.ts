import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Character } from '../../models/character';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss']
})
export class CharacterSheetComponent implements OnInit {

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

}
