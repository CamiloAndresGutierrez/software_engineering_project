import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {
  constructor(private router: Router, private cookieService : CookieService){}
  public canActivate() : boolean{
    let token : boolean = this.cookieService.get('token') == "" ;
    if(!token){
      this.router.navigateByUrl("dashboard");
    }
    return token;
  }
}

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {
  constructor(private router: Router, private cookieService : CookieService){}
  public canActivate() : boolean{
    let token : boolean = this.cookieService.get('token') != "" ;
    if(!token){
      this.router.navigateByUrl("/login");
    }
    return token;
  }
}