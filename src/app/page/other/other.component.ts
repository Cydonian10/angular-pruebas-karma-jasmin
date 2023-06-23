import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-other',
  template: `
    <section>
      <p [highligth]="color">other works!</p>
      <span [highligth]="color">yellow</span>
      <input type="text" [(ngModel)]="color" [highligth]="color" />
      <p>{{ 'mu texto' }}</p>
    </section>
  `,
  styles: [],
})
export class OtherComponent {
  public color = '';
}
