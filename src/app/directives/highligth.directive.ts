import {
  Directive,
  ElementRef,
  Input,
  Signal,
  WritableSignal,
  effect,
  signal,
} from '@angular/core';

@Directive({
  selector: '[highligth]',
})
export class HighligthDirective {
  defaultColor = signal<string>('gray');

  @Input({ alias: 'highligth' }) set color(value: string) {
    if (value?.length > 0) {
      this.element.nativeElement.style.backgroundColor = value;
    }
  }

  constructor(private element: ElementRef) {
    this.element.nativeElement.style.backgroundColor = this.defaultColor();
  }
}
