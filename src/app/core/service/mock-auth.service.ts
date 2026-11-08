import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root' // Важно: переопределит оригинальный сервис, если мы правильно настроим провайдеры
})
export class MockAuthService {
  private readonly profileSubject = new BehaviorSubject<any | null>(null);
  readonly profile$ = this.profileSubject.asObservable();

  constructor(private readonly router: Router) {
    this.restoreProfileFromStorage();
  }

  // 1. Имитируем, что двухфакторная аутентификация НЕ требуется
  isTwoFactorAuthorization(): Observable<any> {
    return of({ response: false });
  }

  // 2. Имитируем успешный логин
  login(username: string, password: string, signedXml?: string): Observable<any> {
    // Возвращаем структуру, которую ожидает твой setTokensFromResponse
    return of({
      accessTokenResponse: {
        access_token: 'mock-jwt-access-token-12345',
        refresh_token: 'mock-jwt-refresh-token-67890'
      }
    });
  }

  // 3. Сохраняем "токены" (в реальности они не будут работать на реальном бэке, но для UI этого достаточно)
  setTokensFromResponse(response: any): boolean {
    const tokenResponse = response?.accessTokenResponse ?? response;
    const accessToken = tokenResponse?.access_token;
    const refreshToken = tokenResponse?.refresh_token;

    if (!accessToken) return false;

    localStorage.setItem('access_token', accessToken);
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }
    return true;
  }

  // 4. Имитируем загрузку профиля с нужными правами, чтобы UI отображался корректно
  loadProfile(): Observable<any | null> {
    const mockProfile = {
      id: 'mock-user-id',
      userName: 'test_user',
      firstName: 'Тестовый',
      lastName: 'Пользователь',
      roles: ['ROLE_ADMIN', 'ROLE_USER'], // Добавь сюда роли, которые нужны для отображения меню/кнопок
      actions: ['read', 'write', 'delete'] // Добавь экшены, если они проверяются в UI
    };

    this.setProfile(mockProfile);
    return of(mockProfile);
  }

  // 5. Остальные методы-заглушки, чтобы приложение не падало, если они вызовутся в других местах
  refreshToken(): Observable<any> {
    return of({ accessTokenResponse: { access_token: 'new-mock-token' } });
  }

  checkLoginPass(username: string, password: string): Observable<any> {
    return of({ response: 'SUCCESS' });
  }

  checkSign(username: string, signedXml: string): Observable<any> {
    return of({ success: true });
  }

  hasStoredTokens(): boolean {
    return Boolean(localStorage.getItem('access_token') || localStorage.getItem('refresh_token'));
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  clearTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  logout(): void {
    this.clearTokens();
    this.setProfile(null);
    void this.router.navigate(['/auth/login']);
  }

  setProfile(profile: any | null): void {
    if (profile) {
      localStorage.setItem('profile', JSON.stringify(profile));
    } else {
      localStorage.removeItem('profile');
    }
    this.profileSubject.next(profile);
  }

  getProfile(): any | null {
    return this.profileSubject.value;
  }

  hasAction(action: string): boolean {
    return this.profileSubject.value?.actions?.includes(action) ?? false;
  }

  hasAnyAction(...actions: string[]): boolean {
    const userActions = this.profileSubject.value?.actions ?? [];
    return actions.some((action) => userActions.includes(action));
  }

  hasRole(role: string): boolean {
    const roles: string[] = this.profileSubject.value?.roles ?? [];
    return roles.includes(role);
  }

  hasAnyRole(roles: string[]): boolean {
    const userRoles: string[] = this.profileSubject.value?.roles ?? [];
    return roles.some((role) => userRoles.includes(role));
  }

  private restoreProfileFromStorage(): void {
    try {
      const storedProfile = localStorage.getItem('profile');
      if (storedProfile) {
        this.profileSubject.next(JSON.parse(storedProfile));
      }
    } catch {
      localStorage.removeItem('profile');
      this.profileSubject.next(null);
    }
  }

  // Заглушки для методов смены пароля, чтобы не было ошибок компиляции
  changePass(u: string, o: string, n: string): Observable<any> { return of({}); }
  changePassEds(u: string, o: string, n: string, s: string): Observable<any> { return of({}); }
  hasValidToken(): boolean { return true; }
}
