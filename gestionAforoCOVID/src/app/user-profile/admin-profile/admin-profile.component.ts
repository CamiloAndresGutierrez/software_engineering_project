import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  adminRegistration = new FormGroup({
    name : new FormControl(''),
    surname : new FormControl(''),
    password : new FormControl('')
  })

  constructor(private userService : UserService, private cookieService : CookieService) { }

  ngOnInit(): void {
  }

  registerAdmin(){
    let token = this.cookieService.get('token');
    let decoded_ = jwtDecode(token);
    this.adminRegistration.value['id'] = decoded_['id']
    this.adminRegistration.value['document'] = decoded_['document']
    
    this.userService.modify_admin(this.adminRegistration).then(result => {
      if(result=="success"){
        alert("La información del ciudadano ha sido modificada");
        location.reload();
      }
    })
  }

  logOut(){
    this.cookieService.delete("token", "/");
    location.reload();
  }

}
