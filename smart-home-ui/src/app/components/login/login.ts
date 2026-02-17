import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

interface LoginFormData {
  userName: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  public loginError = signal<number | undefined>(undefined);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = new FormGroup<LoginFormData>({
    userName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  onSubmit() {
    const loginData = this.form.getRawValue();
    this.authService.login(loginData).subscribe({
      next: () => this.router.navigate(['dashboard']),
      error: (error) => this.loginError.set(error.status),
    });
  }
}
