// import { TestBed } from '@angular/core/testing';

import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    service = new ValueService();
  });

  it('should return value "my value"', () => {
    expect(service.getValue()).toBe('my value');
  });
});
