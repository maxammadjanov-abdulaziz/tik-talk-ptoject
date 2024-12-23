import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { TokenResponse } from './auth.interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);
  cookieService = inject(CookieService);
  baseApiUrl = 'https://icherniakov.ru/yt-course/auth/token';

  token: string | null = null;
  refreshToken: string | null = null;

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token');
      this.refreshToken = this.cookieService.get('refreshToken');
    }
    return !!this.token;
  }

  login(payload: { username: string; password: string }) {
    const fd = new FormData();
    fd.append('username', payload.username);
    fd.append('password', payload.password);

    return this.http.post<TokenResponse>(`${this.baseApiUrl}`, fd).pipe(
      tap(val => this.saveTokens(val))
    );
  }

  refreshAuthToken() {
    return this.http.post<TokenResponse>(`${this.baseApiUrl}token`, {
      refresh_token: this.refreshToken
    }).pipe(
      tap(val => this.saveTokens(val)),
      catchError(err => {
        // Вместо автоматического logout, возвращаем ошибку для обработки в компоненте
        return throwError(() => err);
      })
    );
  }

  logout() {
    const currentUrl = this.router.url; // Сохраняем текущий URL
    this.cookieService.deleteAll();
    this.token = null;
    this.refreshToken = null;
    this.router.navigate(['login'], { queryParams: { returnUrl: currentUrl } });
  }

  saveTokens(res: TokenResponse) {
    this.token = res.access_token;
    this.refreshToken = res.refresh_token;

    // Сохранение токенов в cookies
    this.cookieService.set('token', this.token);
    this.cookieService.set('refreshToken', this.refreshToken);
  }
}
