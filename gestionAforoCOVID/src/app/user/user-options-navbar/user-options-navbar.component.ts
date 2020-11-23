import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-options-navbar',
  templateUrl: './user-options-navbar.component.html',
  styleUrls: ['./user-options-navbar.component.scss']
})
export class UserOptionsNavbarComponent implements OnInit {

  constructor() { }


  flag: boolean=false;

  changeFlag(){
    this.flag = !this.flag;
  }

  checkFlag(){
    return this.flag;
  }

  ngOnInit(): void {
  }

}
