import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-options-login',
  templateUrl: './user-options-login.component.html',
  styleUrls: ['./user-options-login.component.scss']
})
export class UserOptionsLoginComponent implements OnInit {
    
  login_form = new FormGroup({
    username : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  });
  

  private info: string = "";

  constructor(private userService: UserService, private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  public login(){
    this.userService.getInfo(this.login_form).then(result => {
      this.info = result;
      if(this.info == "404"){
        alert("Las credenciales no son válidas, intente de nuevo");
      }
      else{
        this.cookieService.set('token', this.info, {path : "/"});
        location.reload();
      }
    });
  }

  public getInfo(): string {
    return this.info;
  }

}
