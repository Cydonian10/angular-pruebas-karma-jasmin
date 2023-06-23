import { ComponentFixture } from '@angular/core/testing';
import { query, queryById } from './finders';
import { DebugElement } from '@angular/core';

export function setInpuValueUI<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  value: string,
  withTestId = false
) {
  let debugElement: DebugElement;

  if (withTestId) {
    debugElement = queryById(fixture, selector);
  } else {
    debugElement = query(fixture, selector);
  }

  const inputElement: HTMLInputElement = debugElement.nativeElement;

  inputElement.value = value;
  inputElement.dispatchEvent(new Event('input'));
  inputElement.dispatchEvent(new Event('blur'));
}
