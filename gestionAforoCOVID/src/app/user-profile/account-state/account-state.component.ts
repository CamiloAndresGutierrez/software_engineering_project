import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-state',
  templateUrl: './account-state.component.html',
  styleUrls: ['./account-state.component.scss']
})
export class AccountStateComponent implements OnInit {

  constructor(private userService : UserService) { }

  accounts: any;

  ngOnInit(): void {
    this.userService.get_accounts().then(result => {
      this.accounts = result;
    })
  }

  get_accounts_(){
    return this.accounts;
  }

  manage_account(nit : string, username: string, veredict : string){
    this.userService.manage_account(nit, username, veredict).then(result => {
      location.reload();
    })
  }

}
