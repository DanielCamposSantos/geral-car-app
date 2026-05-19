import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private fb = inject(FormBuilder);

  private auth = inject(Auth);

  private router = inject(Router);

  readonly loading = signal(false);

  readonly errorMessage =
    signal<string | null>(null);

  readonly loginForm =
    this.fb.nonNullable.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4)
        ]
      ]

    });

  onSubmit(): void {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;

    }

    this.loading.set(true);

    this.errorMessage.set(null);

    const {
      email,
      password
    } = this.loginForm.getRawValue();

    this.auth.login(
      email,
      password
    ).subscribe({

      next: () => {

        this.loading.set(false);

        this.router.navigate([
          '/admin'
        ]);

      },

      error: () => {

        this.loading.set(false);

        this.errorMessage.set(
          'E-mail ou senha inválidos.'
        );

      }

    });

  }

  hasError(
    field: string,
    error: string
  ): boolean {

    const control =
      this.loginForm.get(field);

    return !!(
      control?.touched &&
      control?.hasError(error)
    );

  }

}