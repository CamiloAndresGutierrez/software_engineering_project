import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-check-registration',
  templateUrl: './check-registration.component.html',
  styleUrls: ['./check-registration.component.scss']
})
export class CheckRegistrationComponent implements OnInit {

  constructor(private userService : UserService) { }

  accounts_info : any;

  ngOnInit(): void {
    this.userService.get_pending().then(result =>{
      this.accounts_info = result;
    })
  }

  get_accounts(){
    return this.accounts_info;
  }


  
  accept_account(nit: string, name : string){
    this.userService.accept_pending(nit).then(result => {
      alert("La cuenta de " + name + " ha sido agregada");
      location.reload();
    })
  }

  reject_account(nit: string, name : string){
    this.userService.reject_pending(nit).then(result => {
      alert("La cuenta de " + name + " ha sido rechazada");
      location.reload();
    })
  }


}
