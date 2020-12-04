import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
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

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private cookieService : CookieService){}
  public canActivate() : boolean{
    let flag : boolean = true;
    let token = this.cookieService.get('token');
    let decoded_ = jwtDecode(token);
    if (decoded_['rol'] != "ADMIN"){
      this.router.navigateByUrl("/dashboard");
      flag = false;
    }
    return flag;
  }
}

@Injectable({
  providedIn: 'root'
})
export class EstablishmentGuard implements CanActivate {
  constructor(private router: Router, private cookieService : CookieService){}
  public canActivate() : boolean{
    let flag : boolean = true;
    let token = this.cookieService.get('token');
    let decoded_ = jwtDecode(token);
    if (decoded_['rol'] != "PUB_EST"){
      this.router.navigateByUrl("/dashboard");
      flag = false;
    }
    return flag;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CitizenGuard implements CanActivate {
  constructor(private router: Router, private cookieService : CookieService){}
  public canActivate() : boolean{
    let flag : boolean = true;
    let token = this.cookieService.get('token');
    let decoded_ = jwtDecode(token);
    if (decoded_['rol'] != "CITIZEN"){
      this.router.navigateByUrl("/dashboard");
      flag = false;
    }
    return flag;
  }
}

@Injectable({
  providedIn: 'root'
})
export class HealthEntityGuard implements CanActivate {
  constructor(private router: Router, private cookieService : CookieService){}
  public canActivate() : boolean{
    let flag : boolean = true;
    let token = this.cookieService.get('token');
    let decoded_ = jwtDecode(token);    
    if (decoded_['rol'] != "HEALTH_ENT"){
      this.router.navigateByUrl("/dashboard");
      flag = false;
    }
    return flag;
  }
}

    
    