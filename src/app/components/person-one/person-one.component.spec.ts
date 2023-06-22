import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonOneComponent } from './person-one.component';
import { Person } from 'src/app/calculator/person';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PersonComponent } from 'src/app/page/person/person.component';

describe('PersonOneComponent', () => {
  let component: PersonOneComponent;
  let fixture: ComponentFixture<PersonOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonOneComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should the name be 'Gabriel'", () => {
    component.person = new Person('Gabriel', 'Vsqz', 12, 60, 1.6);
    expect(component.person?.name).toEqual('Gabriel');
  });

  it("should have <span> with '{{person.name}}'", () => {
    //arrange
    component.person = new Person('Gabriel', 'Vsqz', 12, 60, 1.6);

    fixture.detectChanges();

    const personDebug: DebugElement = fixture.debugElement;
    const spanDebug: DebugElement = personDebug.query(By.css('span'));
    const span: HTMLElement = spanDebug.nativeElement;

    // const p = personElement.querySelector('p');
    expect(span?.textContent).toContain(component.person.name);
  });

  it('should diplay a text with IMC do click', () => {
    const expectMsg = 'normal';
    component.person = new Person('Gabriel', 'Vsqz', 26, 60, 1.6);
    component.calcIMC();
    fixture.detectChanges();

    const buttonNative: HTMLElement = fixture.nativeElement;
    const button = buttonNative.querySelector('button');

    expect(button?.textContent).toContain(expectMsg);
  });

  it('should diplay a text with IMC do click active', () => {
    const expectMsg = 'normal';
    component.person = new Person('Gabriel', 'Vsqz', 26, 60, 1.6);

    const buttonDeg = fixture.debugElement.query(By.css('button'));
    const buttonEl = buttonDeg.nativeElement;

    buttonDeg.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(buttonEl?.textContent).toContain(expectMsg);
  });

  it('should emit Gabriel the output onSelected', () => {
    const expectName = 'Gabriel';
    component.person = new Person('Gabriel', 'Vsqz', 26, 60, 1.6);

    const buttonDeg = fixture.debugElement.query(By.css('button.btn-danger '));
    // const buttonEl = buttonDeg.nativeElement;

    let selectedNamePerson = '';
    component.onSelected.subscribe((resp) => {
      selectedNamePerson = resp;
    });

    buttonDeg.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(selectedNamePerson).toEqual(expectName);
    // expect(buttonEl?.textContent).toContain('');
  });
});

@Component({
  template: `<app-person-one
    [person]="person"
    (onSelected)="onSelected($event)"
  >
  </app-person-one>`,
})
class HostComponent {
  person = new Person('Santi', 'Molina', 12, 40, 1.5);
  selectedPerson: string = '';

  onSelected(name: string) {
    this.selectedPerson = name;
  }
}

describe('PersonComponent from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, PersonOneComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create hostComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Should display person name', () => {
    //Arrange
    const expectName = component.person.name;
    const spanDebug = fixture.debugElement.query(By.css('app-person-one span'));
    const spanElement = spanDebug.nativeElement;

    //Act
    fixture.detectChanges();

    //Assert
    expect(spanElement.textContent).toContain(expectName);
  });

  it('Should raise selected event when clicked', () => {
    //Arrange
    const expectName = component.person.name;
    const buttonDebug = fixture.debugElement.query(
      By.css('app-person-one .btn-danger')
    );

    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    //Act

    //Assert
    expect(component.selectedPerson).toEqual(component.person.name);
  });
});
