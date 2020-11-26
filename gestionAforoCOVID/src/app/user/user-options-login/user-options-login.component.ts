import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-options-login',
  templateUrl: './user-options-login.component.html',
  styleUrls: ['./user-options-login.component.scss']
})
export class UserOptionsLoginComponent implements OnInit {
  constructor(private cookieService: CookieService) {}

  
  login_form = new FormGroup({
    username : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  });
  
  
  ngOnInit(): void {
    
  }


}
