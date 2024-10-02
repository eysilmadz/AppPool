import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from '../entities/token';
import { JwtHelperService } from '@auth0/angular-jwt'; // JWT işlemleri için eklendi

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private jwtHelper = new JwtHelperService(); // JWT helper servisi

  constructor(private router: Router) {}

  //API'den alınan JWT token'ı localStorage'a kaydeder.
  async setToken(token: Token): Promise<void> {
 
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem('token', JSON.stringify(token));
      
    }
  }

  //localStorage'dan token'ı alır.
  // getToken(): Token | null {
  //   var token = localStorage.getItem('token');
  //   if (token === null) return null;
  //   return JSON.parse(token);
  // }

  //localStorage'dan token'ı asenkron olarak alır.
  async getToken(): Promise<Token | null> {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      return token ? JSON.parse(token) : null;
    }
    return null;
  }

  //Kullanıcı oturumunun geçerli olup olmadığını kontrol eder. Eğer token varsa, 
  //geçerlilik kontrol edilir ve eğer token geçersizse kullanıcı oturumu sonlandırılır.
  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    if (token) {
      console.log("DEneme",token)
      const isTokenValid = this.isTokenValid(token);
      if (isTokenValid) {
        return true;
      } else {
        this.logout();
        return false;
      }
    } else {
      return false;
    }
  }

  //Token'ın süresinin geçip geçmediğini kontrol eder.
  isTokenValid(token: Token): boolean {
    try {
      var tokenExpireDate = new Date(token.tokenExpireDate);
      var now = new Date();
      return tokenExpireDate > now && !this.jwtHelper.isTokenExpired(token.accessToken); // Token geçerlilik kontrolü
    } catch (error) {
      return false;
    }
  }

  //Kullanıcı oturumunu sonlandırır, token'ı siler ve oturum açma sayfasına yönlendirir.
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}

