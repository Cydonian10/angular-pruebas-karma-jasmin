import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from 'src/app/calculator/person';

@Component({
  selector: 'app-person-one',
  template: `
    <ng-container *ngIf="person">
      <article>
        <span>Nombre es {{ person.name }}</span>
      </article>
    </ng-container>

    <button (click)="calcIMC()" class="btn btn-primary">IMC: {{ imc }}</button>
    <button (click)="onSelectedName()" class="btn btn-danger">
      Emit Person Name
    </button>
  `,
  styles: [],
})
export class PersonOneComponent {
  @Input({ required: true })
  person!: Person;
  imc = 'null';

  @Output()
  onSelected = new EventEmitter<string>();

  calcIMC() {
    this.imc = this.person.calcIMC();
  }

  onSelectedName() {
    this.onSelected.emit(this.person.name);
  }
}
