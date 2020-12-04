import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { TestsService } from 'src/app/services/tests.service';

@Component({
  selector: 'app-citizen-test',
  templateUrl: './citizen-test.component.html',
  styleUrls: ['./citizen-test.component.scss']
})
export class CitizenTestComponent implements OnInit {

  private test_info : any ;
  private date : string = "";
  private aux_test_info : any;

  constructor(private cookieService : CookieService, private testService : TestsService) { }

  citizen_test = new FormGroup({
    date : new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    let token = this.cookieService.get('token');
    let decoded_ = jwtDecode(token);
    this.testService.get_citizen_test(decoded_['id'], decoded_['document']).then(result => {
      this.test_info = result;
      this.aux_test_info = result;
    })
  }

  getTest(){
    return this.test_info;
  }

  setDate(){
    this.date = this.citizen_test.value['date'];
    this.test_info = this.aux_test_info;
    let info = this.test_info;
    let aux = []
    for(let i=0;i<info.length;i++){
      if(this.date == info[i][1]){
        aux.push(info[i])
      }
    }
    
    this.test_info = aux;
  }

  deleteFilter(){
    this.test_info = this.aux_test_info;
  }

}
