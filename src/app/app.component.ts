import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('navbarBurger') navbarBurgerElement: ElementRef;
  @ViewChild('navbarMenu') navbarMenuElement: ElementRef;

  toggleMobileMenu(){
    (<HTMLElement>this.navbarBurgerElement.nativeElement).classList.toggle('is-active');
    (<HTMLElement>this.navbarMenuElement.nativeElement).classList.toggle('is-active');
  }
}
