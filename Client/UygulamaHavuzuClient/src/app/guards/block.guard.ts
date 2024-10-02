import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class BlockGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const isAuthenticated = await this.tokenService.isAuthenticated();
    console.log(this.tokenService.getToken())
    if (isAuthenticated) {
      console.log("Guard activated");
      return true;
    } else {
      await this.router.navigate(['/login']); // Eğer oturum açılmadıysa login sayfasına yönlendir
      return false;
    }
  }
}