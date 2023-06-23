import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/users/user.service';
import { MyValidators } from 'src/app/utlis/validators';

@Component({
  selector: 'app-register',
  template: `
    <section class="container">
      <h5>Register</h5>
      <form
        [formGroup]="form"
        novalidate
        (ngSubmit)="register($event)"
        autocomplete="off"
      >
        <div>
          <div class="grid">
            <!-- *********** -->
            <!-- Field Name -->
            <!-- *********** -->
            <div class="form-group">
              <label for="name">
                Full Name
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  name="name"
                  placeholder="Full Name"
                  formControlName="name"
                  [attr.aria-invalid]="
                    nameField?.touched ? nameField?.invalid : ''
                  "
                />
                <ng-container *ngIf="nameField?.touched && nameField?.errors">
                  <small *ngIf="nameField?.hasError('required')"
                    >*Required</small
                  >
                </ng-container>
              </label>
            </div>

            <!-- *********** -->
            <!-- Field Email -->
            <!-- *********** -->
            <div class="form-group">
              <label for="email">
                Email address
                <input
                  type="email"
                  id="email"
                  name="email"
                  class="form-control"
                  placeholder="Email address"
                  formControlName="email"
                  [attr.aria-invalid]="
                    emailField?.touched ? emailField?.invalid : ''
                  "
                />
                <ng-container *ngIf="emailField?.touched && emailField?.errors">
                  <small
                    data-testid="emailField-required"
                    *ngIf="emailField?.hasError('required')"
                    >*Required</small
                  >
                  <small
                    data-testid="emailField-email"
                    *ngIf="emailField?.hasError('email')"
                    >*It's not a email</small
                  >
                </ng-container>
              </label>
            </div>
          </div>

          <!-- *********** -->
          <!-- Field Password -->
          <!-- *********** -->
          <div class="form-group">
            <label for="password">
              Password
              <input
                type="password"
                id="password"
                name="email"
                class="form-control"
                placeholder="Password"
                formControlName="password"
                [attr.aria-invalid]="
                  passwordField?.touched ? passwordField?.invalid : ''
                "
              />
              <ng-container
                *ngIf="passwordField?.touched && passwordField?.errors"
              >
                <small *ngIf="passwordField?.hasError('required')"
                  >*Required</small
                >
                <small *ngIf="passwordField?.hasError('minlength')"
                  >*Should be greater 6</small
                >
                <small *ngIf="passwordField?.hasError('invalid_password')"
                  >*Should contain numbers</small
                >
              </ng-container>
            </label>
          </div>

          <!-- *********** -->
          <!-- Field Confirm -->
          <!-- *********** -->
          <div class="form-group">
            <label for="confirmPassword">
              Confirm Password
              <input
                type="password"
                id="confirmPassword"
                name="email"
                class="form-control"
                placeholder="Confirm password"
                formControlName="confirmPassword"
                [attr.aria-invalid]="
                  confirmPasswordField?.touched
                    ? form.hasError('match_password')
                    : ''
                "
              />
              <ng-container
                *ngIf="confirmPasswordField?.touched && form?.errors"
              >
                <small *ngIf="form?.hasError('match_password')"
                  >*Not matching</small
                >
              </ng-container>
            </label>
          </div>

          <!-- *********** -->
          <!-- Field terms -->
          <!-- *********** -->
          <fieldset>
            <label for="terms">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                formControlName="checkTerms"
                [attr.aria-invalid]="
                  checkTermsField?.touched ? checkTermsField?.invalid : ''
                "
              />
              I agree to the Terms and Conditions
            </label>
          </fieldset>
          <button data-testid="btn-submit" type="submit">Register</button>
        </div>
      </form>
    </section>
  `,
  styles: [],
})
export class RegisterComponent {
  form = this.fb.nonNullable.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          MyValidators.validPassword,
        ],
      ],
      confirmPassword: ['', [Validators.required]],
      checkTerms: [false, [Validators.requiredTrue]],
    },
    {
      validators: MyValidators.matchPasswords,
    }
  );
  status: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(private fb: FormBuilder, private usersService: UserService) {}

  ngOnInit(): void {}

  register(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.status = 'loading';
      const value = this.form.getRawValue();
      this.usersService.create(value).subscribe({
        next: (rta) => {
          this.status = 'success';
          console.log(rta);
        },
        error: () => {
          this.status = 'error';
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  get nameField() {
    return this.form.get('name');
  }

  get lastNameField() {
    return this.form.get('lastName');
  }

  get emailField() {
    return this.form.get('email');
  }

  get passwordField() {
    return this.form.get('password');
  }

  get confirmPasswordField() {
    return this.form.get('confirmPassword');
  }

  get checkTermsField() {
    return this.form.get('checkTerms');
  }
}
