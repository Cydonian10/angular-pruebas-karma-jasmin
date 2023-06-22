import { Component } from '@angular/core';
import { Person } from 'src/app/calculator/person';

@Component({
  selector: 'app-person',
  template: `
    <h3>Home Person Page {{ people.length }}</h3>
    <p>soy un parrafo</p>
    <span *ngIf="selectedPersonName">Persona : {{ selectedPersonName }}</span>

    <div *ngFor="let person of people">
      <app-person-one [person]="person" (onSelected)="chooose($event)" />
    </div>
  `,
  styles: [],
})
export class PersonComponent {
  public people: Person[] = [
    new Person('Gabriel', 'Vsqz', 12, 60, 1.6),
    new Person('Nicolas', 'Molina', 12, 60, 1.6),
  ];

  selectedPersonName: string | null = null;

  chooose(name: string) {
    this.selectedPersonName = name;
  }
}
