import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    fullName: ['', [Validators.required, Validators.minLength(3)]],
  });

  onSubmit() {
    if (this.registerForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const {
      email = '',
      password = '',
      fullName = '',
    } = this.registerForm.value;
    // console.log({ email, password, fullName });
    this.authService
      .register(email!, password!, fullName!)
      .subscribe((registerResponse) => {
        if (registerResponse) {
          this.router.navigateByUrl('/');
          return;
        }
        this.hasError.set(true);
      });
  }
}
