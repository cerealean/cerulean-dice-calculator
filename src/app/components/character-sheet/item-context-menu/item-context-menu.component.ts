import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter, ViewChild, ElementRef, HostListener } from "@angular/core";
import { Item } from "../../../models/item";

@Component({
    selector: 'item-context-menu',
    templateUrl: './item-context-menu.html',
    styleUrls: ['./item-context-menu.component.scss']
})
export class ItemContextMenuComponent implements OnChanges {
    public displayTitle = 'TBD';
    @ViewChild('itemMenu') itemMenu: ElementRef;
    @Input() items: Item[] = [];
    @Output() remove: EventEmitter<Item[]> = new EventEmitter<Item[]>();
    @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.items && changes.items.currentValue){
            console.log(changes.items.currentValue);
            if(changes.items.currentValue.length > 1){
                this.displayTitle = 'Multiple';
            }
            else if(changes.items.currentValue.length === 1) {
                this.displayTitle = changes.items.currentValue[0].name;
            }
        }
    }

    removeItems(){
        this.remove.emit(this.items);
    }

    @HostListener('document:click', ['$event'])
    callCloseIfClickedOutside($event: MouseEvent){
        if(!this.itemMenu.nativeElement.contains($event.target)){
            this.close.emit(true);
        }
    }
}