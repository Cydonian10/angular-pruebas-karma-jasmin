import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { Auth } from 'src/app/models/general.model';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://api.escuelajs.co/api/v1';

  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  login(email: string, password: string) {
    return this.http
      .post<Auth>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap((response) => this.tokenService.saveToken(response.access_token))
      );
  }
}
