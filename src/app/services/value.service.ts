import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValueService {
  private value = 'my value';

  getValue(): string {
    return this.value;
  }

  setValue(value: string): void {
    this.value = value;
  }

  getPromiseValue(): Promise<string> {
    return Promise.resolve(this.value);
  }

  getObservableValue(): Observable<string> {
    return of(this.value);
  }
}
