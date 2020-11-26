import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss']
})
export class UserNavbarComponent implements OnInit {

  constructor() { }

  citizen : boolean;
  establishment : boolean; 
  healthEntity : boolean;
  admin : boolean;
  name : string = "John Doe";

  flag: boolean=false;

  changeFlag(){
    this.flag = !this.flag;
  }

  checkFlag(){
    return this.flag;
  }

  isCitizen(){
    return this.citizen = true;
  }

  isEstablishment(){
    return this.establishment = false;
  }

  isHealthEntity(){
    return this.healthEntity = false;
  }

  isAdmin(){
    return this.admin = false;
  }

  ngOnInit(): void {
  }

}
