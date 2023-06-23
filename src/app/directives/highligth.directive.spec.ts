import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighligthDirective } from './highligth.directive';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ReservePipe } from '../pipes/reserve.pipe';

@Component({
  template: `
    <section>
      <p highligth>other works!</p>
      <span highligth="yellow">yellow</span>
      <h4>Prueba</h4>
      <input type="text" [(ngModel)]="color" [highligth]="color" />
    </section>
  `,
})
class HostComponent {
  color = 'pink';
}

describe('HighligthDirective', () => {
  let component: HostComponent;
  let fixure: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HostComponent, HighligthDirective],
    });
    fixure = TestBed.createComponent(HostComponent);
    component = fixure.componentInstance;
    fixure.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have three highligth elements', () => {
    const elements = fixure.debugElement.queryAll(
      By.directive(HighligthDirective)
    );

    const elemenstsNoDirectiva = fixure.debugElement.queryAll(
      By.css('*:not([highligth])')
    );

    expect(elements.length).toEqual(3);
    expect(elemenstsNoDirectiva.length).toEqual(3);
  });

  it('should have  element be match with color', () => {
    const elements = fixure.debugElement.queryAll(
      By.directive(HighligthDirective)
    );
    expect(elements[0].nativeElement.style.backgroundColor).toEqual('gray');
  });

  it('should have the  p be default Color', () => {
    const titleDebugElement = fixure.debugElement.query(By.css('p'));
    const directiva = titleDebugElement.injector.get(HighligthDirective);

    expect(titleDebugElement.nativeElement.style.backgroundColor).toEqual(
      directiva.defaultColor()
    );
  });

  it('should bind <input>  and change the bg Color', () => {
    const inputDebugElement = fixure.debugElement.query(By.css('input'));
    const inputNavtivo = inputDebugElement.nativeElement as HTMLInputElement;

    fixure.detectChanges();
    expect(inputNavtivo.style.backgroundColor).toEqual('pink');

    inputNavtivo.value = 'red';
    inputNavtivo.dispatchEvent(new Event('input'));
    fixure.detectChanges();
    expect(inputNavtivo.style.backgroundColor).toEqual('red');
    expect(component.color).toEqual('red');
  });
});
