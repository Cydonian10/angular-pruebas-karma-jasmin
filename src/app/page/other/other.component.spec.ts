import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherComponent } from './other.component';
import { ReservePipe } from 'src/app/pipes/reserve.pipe';
import { HighligthDirective } from 'src/app/directives/highligth.directive';
import { FormsModule } from '@angular/forms';

describe('OtherComponent', () => {
  let component: OtherComponent;
  let fixture: ComponentFixture<OtherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [OtherComponent, ReservePipe, HighligthDirective],
    });
    fixture = TestBed.createComponent(OtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
