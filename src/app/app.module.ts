import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HoverClassDirective } from './directives/hover-class/hover-class.directive';
import { DiceCalculatorComponent } from './components/dice-calculator/dice-calculator.component';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { ChatComponent } from './components/chat/chat.component';
import { CharacterSheetComponent } from './components/character-sheet/character-sheet.component';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { ItemContextMenuComponent } from './components/character-sheet/item-context-menu/item-context-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    HoverClassDirective,
    DiceCalculatorComponent,
    CurrencyConverterComponent,
    ChatComponent,
    CharacterSheetComponent,
    EnumToArrayPipe,
    ItemContextMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
