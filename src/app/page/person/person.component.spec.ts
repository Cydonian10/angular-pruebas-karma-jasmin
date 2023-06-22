import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonComponent } from './person.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PersonOneComponent } from 'src/app/components/person-one/person-one.component';
import { Person } from '../../calculator/person';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixure: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonComponent, PersonOneComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixure = TestBed.createComponent(PersonComponent);
    component = fixure.componentInstance;
    fixure.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have <p> with 'soy un parrafo'", () => {
    const personDebug: DebugElement = fixure.debugElement;
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    const personElement: HTMLElement = pDebug.nativeElement;
    // const p = personElement.querySelector('p');
    expect(personElement?.textContent).toEqual('soy un parrafo');
  });

  it('should render a person selected from app-person', () => {
    component.people = [
      new Person('Esteban', 'Qs', 27, 89, 1.77),
      new Person('Valentin', 'Feregrino', 12, 2, 3),
      new Person('Antoio', 'Feregrino', 12, 2, 3),
    ];

    fixure.detectChanges();
    const debuElement = fixure.debugElement.queryAll(By.css('app-person-one'));

    expect(debuElement.length).toEqual(3);
  });

  it("shouuld render selectedPerson 'Estaban'", () => {
    component.people = [new Person('Esteban', 'Qs', 27, 89, 1.77)];

    fixure.detectChanges();
    const debuElement = fixure.debugElement.queryAll(
      By.css('app-person-one .btn-danger')
    );

    debuElement[0].triggerEventHandler('click', null);
    fixure.detectChanges();

    expect(component.selectedPersonName).toEqual('Esteban');
  });
});
