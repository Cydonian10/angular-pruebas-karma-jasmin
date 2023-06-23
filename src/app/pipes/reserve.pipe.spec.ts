import { Component } from '@angular/core';
import { ReservePipe } from './reserve.pipe';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('ReservePipe', () => {
  it('create an instance', () => {
    const pipe = new ReservePipe();
    expect(pipe).toBeTruthy();
  });

  it("should transoform 'roma' to 'amor'", () => {
    const pipe = new ReservePipe();
    const rta = pipe.transform('roma');
    expect(rta).toEqual('amor');
  });
});

@Component({
  template: `
    <h5>{{ 'amor' | reserve }}</h5>
    <input type="text" [(ngModel)]="text" />
    <p>{{ text | reserve }}</p>
  `,
})
class HostComponent {
  text = '';
}

describe('pipe host component', () => {
  let component: HostComponent;
  let fixure: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HostComponent, ReservePipe],
    });
    fixure = TestBed.createComponent(HostComponent);
    component = fixure.componentInstance;
    fixure.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it("should the h5 be 'roma'", () => {
    const h5 = fixure.debugElement.query(By.css('h5'));
    expect(h5.nativeElement.textContent).toEqual('roma');
  });

  it('shoudl apply reverse pipe when typing in the input', () => {
    const inputDebug = fixure.debugElement.query(By.css('input'));
    const pDebug = fixure.debugElement.query(By.css('p'));

    expect(pDebug.nativeElement.textContent).toEqual('');

    inputDebug.nativeElement.value = 'ANA 2';

    inputDebug.nativeElement.dispatchEvent(new Event('input'));
    fixure.detectChanges();
    expect(pDebug.nativeElement.textContent).toEqual('2 ANA');
  });
});
