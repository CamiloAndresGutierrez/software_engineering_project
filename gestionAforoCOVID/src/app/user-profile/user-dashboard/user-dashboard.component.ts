import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  constructor(private cookieService : CookieService,  public router: Router) { }

  name : string;
  token : string;
  rol : string;
  ngOnInit(): void {
    this.token = this.cookieService.get('token');
    let decoded_ = jwtDecode(this.token);
    this.name = decoded_['name'];
    if(decoded_['rol'] == "CITIZEN"){
      this.rol = "Ciudadano";
    }
    else if (decoded_['rol'] == "ADMIN"){
      this.rol = "Administrador";
    }
    else if (decoded_['rol'] == "PUB_EST"){
      this.rol = "Establecimiento Público";
    }
    else {
      this.rol = "Entidad de Salud";
    }
    
  }

}
