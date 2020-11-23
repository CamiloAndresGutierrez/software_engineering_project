import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-options-registration',
  templateUrl: './user-options-registration.component.html',
  styleUrls: ['./user-options-registration.component.scss']
})
export class UserOptionsRegistrationComponent implements OnInit {

  constructor(public router: Router) { }


  ngOnInit(): void {
  }

}
