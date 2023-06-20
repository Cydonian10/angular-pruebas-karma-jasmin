import { MasterService } from './master.service';
import { ValueService } from './value.service';

describe('ControlelrController', () => {
  beforeEach(async () => {});

  it('should return "other value" from the take object', () => {
    const fake = { getValue: () => 'other value' };
    const masterService = new MasterService(fake as ValueService);
    expect(masterService.getValue()).toBe('other value');
  });
});
