import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private http = inject(HttpClient);
  private router = inject(Router);

  private baseUrl = `${environment.API_URL}/api/auth`;

  readonly authenticated = signal(false);

  readonly isAuthenticated = computed(() => {
    return this.authenticated();
  });

  login(email: string, password: string) {

    return this.http.post<void>(
      `${this.baseUrl}/login`,
      { email, password }
    ).pipe(

      tap(() => {
        this.authenticated.set(true);
      })

    );

  }

  logout(): void {

    this.authenticated.set(false);

    this.router.navigate([
      '/login'
    ]);

  }

}