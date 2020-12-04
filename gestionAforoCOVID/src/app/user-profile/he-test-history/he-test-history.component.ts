import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { TestsService } from 'src/app/services/tests.service';

@Component({
  selector: 'app-he-test-history',
  templateUrl: './he-test-history.component.html',
  styleUrls: ['./he-test-history.component.scss']
})
export class HETestHistoryComponent implements OnInit {

  private test_info : any;
  private aux_test_info : any;
  private state = ["Positivo", "Negativo"];
  private token : any;

  he_test = new FormGroup({
    date : new FormControl('', Validators.required)
  })

  change_test_state = new FormGroup({
    state : new FormControl('', Validators.required)
  })

  constructor(private cookieService : CookieService, private testService : TestsService) { }

  ngOnInit(): void {
    this.token = this.cookieService.get('token');
    let decoded_ = jwtDecode(this.token);
    
    this.testService.get_HE_test(decoded_['id']).then(result => {
      this.test_info = result;
      this.aux_test_info = result;
    })
  }

  getTests(){
    return this.test_info;
  }

  setDate(){
  }

  deleteFilter(){
  }

  get_states(){
    return this.state;
  }
  
  private info : any;

  change_state(id : number, document : string, date : string, time : string){
    console.log(id);
    console.log(document);
    console.log(date);
    console.log(time);
    console.log(this.change_test_state.value['state']);
    
    
    this.testService.change_state(id, document, date, time, this.change_test_state.value['state']).then(result => {
      this.info = result;
      if(this.info == "success"){
        alert("El estado de la prueba ha sido modificado");
        location.reload();
      }
    })
  }

}
