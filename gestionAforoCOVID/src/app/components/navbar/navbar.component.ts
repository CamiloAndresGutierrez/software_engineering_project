import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

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
