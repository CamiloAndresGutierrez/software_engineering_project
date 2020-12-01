import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss']
})
export class UserNavbarComponent implements OnInit {

  constructor(private cookieService : CookieService) { }
  
  token : string;

  citizen : boolean;
  establishment : boolean; 
  healthEntity : boolean;
  admin : boolean;
  name : string = "";

  flag: boolean=false;

  changeFlag(){
    this.flag = !this.flag;
  }

  checkFlag(){
    return this.flag;
  }

  isCitizen(){
    return this.citizen;
  }

  isEstablishment(){
    return this.establishment;
  }

  isHealthEntity(){
    return this.healthEntity;
  }

  isAdmin(){
    return this.admin;
  }

  ROL = ["ADMIN", "CITIZEN", "PUB_EST", "HEALTH_ENT"]

  ngOnInit(): void {
    
    this.token = this.cookieService.get('token');
    let decoded_ = jwtDecode(this.token);
    if(decoded_['rol'] == "CITIZEN"){
      this.citizen = true;
    }
    else if (decoded_['rol'] == "ADMIN"){
      this.admin = true;
    }
    else if (decoded_['rol'] == "PUB_EST"){
      this.establishment = true;
    }
    else {
      this.healthEntity = true;
    }
  }

}
