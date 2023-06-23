import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  asyncData,
  asyncError,
  clickElement,
  getText,
  mockObservable,
  query,
} from 'testing';
import { setInpuValueUI } from 'testing/forms';
import { generateOneUser } from '../../../models/user.mock';
import { UserService } from '../../../services/users/user.service';

describe('Register Component', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('UserService', ['create']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RegisterComponent],
      providers: [
        {
          provide: UserService,
          useValue: spy,
        },
      ],
    });
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    fixture.detectChanges();
  });

  it('create component', () => {
    expect(component).toBeTruthy();
  });

  it('should the emailField be invalid', () => {
    component.emailField?.setValue('esto no es un correo');
    expect(component.emailField?.invalid)
      .withContext('wrong email')
      .toBeTruthy();

    component.emailField?.setValue('');
    expect(component.emailField?.invalid).withContext('empty').toBeTruthy();
  });

  it('should the passworField be invalid', () => {
    component.passwordField?.setValue('');
    expect(component.passwordField?.invalid).withContext('empaty').toBeTruthy();

    component.passwordField?.setValue('12345');
    expect(component.passwordField?.invalid).withContext('12345').toBeTruthy();

    component.passwordField?.setValue('asdfasdfadf');
    expect(component.passwordField?.invalid)
      .withContext('without number')
      .toBeTruthy();
  });

  it('should the form be invalid', () => {
    component.form.patchValue({
      name: 'Gabirl',
      email: 'ga@emiail.com',
      password: '123123123',
      confirmPassword: 'asdfasdf',
      checkTerms: true,
    });

    expect(component.form.invalid).toBeTruthy();
  });

  it('should the emailField be invalid from UI', () => {
    // const inputDebug = query(fixture, 'input#email');
    // const inputElement: HTMLInputElement = inputDebug.nativeElement;

    // inputElement.value = 'esto no es un correo';
    // inputElement.dispatchEvent(new Event('input'));
    // inputElement.dispatchEvent(new Event('blur'));

    /**
     * Helper para llenar Campos
     */
    setInpuValueUI(fixture, 'input#email', 'esto no es un correo');

    fixture.detectChanges();

    expect(component.emailField?.invalid)
      .withContext('wrong email')
      .toBeTruthy();

    const textError = getText(fixture, 'emailField-email');
    expect(textError).toContain("It's not a email");
  });

  /**
   * Pruebas para el envio de form
   */
  it('should the form be successfully', () => {
    component.form.patchValue({
      name: 'Gabriell',
      email: 'ga@email.com',
      password: '123123123',
      confirmPassword: '123123123',
      checkTerms: true,
    });
    const mockUser = generateOneUser();
    userService.create.and.returnValue(mockObservable(mockUser));

    // register form recibe un evento de submit
    component.register(new Event('submit'));

    expect(component.form.valid).toBeTruthy();
    expect(userService.create).toHaveBeenCalled();
  });

  /**
   * Utlizando FakeAsync
   */
  it('should the form be successfully loading => success', fakeAsync(() => {
    component.form.patchValue({
      name: 'Gabriell',
      email: 'ga@email.com',
      password: '123123123',
      confirmPassword: '123123123',
      checkTerms: true,
    });
    const mockUser = generateOneUser();

    userService.create.and.returnValue(asyncData(mockUser));

    clickElement(fixture, 'btn-submit', true);
    fixture.detectChanges();
    expect(component.status).toEqual('loading');

    tick(); // exec pending task
    fixture.detectChanges();

    expect(component.status).toEqual('success');
    expect(component.form.valid).toBeTruthy();
    expect(userService.create).toHaveBeenCalled();
  }));

  /**
   * Utlizando FakeAsync con errores
   */
  it('should the form from UI but with errors in the service', fakeAsync(() => {
    component.form.patchValue({
      name: 'Gabriell',
      email: 'ga@email.com',
      password: '123123123',
      confirmPassword: '123123123',
      checkTerms: true,
    });
    const mockUser = generateOneUser();

    userService.create.and.returnValue(asyncError('error'));

    clickElement(fixture, 'btn-submit', true);
    fixture.detectChanges();
    expect(component.status).toEqual('loading');

    tick(); // exec pending task
    fixture.detectChanges();

    expect(component.status).toEqual('error');
    expect(component.form.valid).toBeTruthy();
    expect(userService.create).toHaveBeenCalled();
  }));
});
