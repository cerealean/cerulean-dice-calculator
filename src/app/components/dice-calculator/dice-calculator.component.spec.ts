import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceCalculatorComponent } from './dice-calculator.component';

describe('DiceCalculatorComponent', () => {
  let component: DiceCalculatorComponent;
  let fixture: ComponentFixture<DiceCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiceCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiceCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
