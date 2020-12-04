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
  private date : string = "";
  private time : string = "";
  private id_ : string = "";

  

  change_test_state = new FormGroup({
    state : new FormControl('', Validators.required)
  })

  he_date = new FormGroup({
    date : new FormControl('', Validators.required)
  })

  he_time = new FormGroup({
    time : new FormControl('', Validators.required)
  })

  he_ID = new FormGroup({
    id : new FormControl('', Validators.required)
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
    this.date = this.he_date.value['date'];
    //this.test_info = this.aux_test_info;
    let info = this.test_info;
    
    let aux = []
    for(let i=0;i<info.length;i++){
      if(this.date == info[i][3]){
        aux.push(info[i])
      }
    }
    this.test_info = aux;
  }

  deleteFilter(){
    this.test_info = this.aux_test_info;
  }

  get_states(){
    return this.state;
  }
  
  private info : any;

  change_state(id : number, document : string, date : string, time : string){

    this.testService.change_state(id, document, date, time, this.change_test_state.value['state']).then(result => {
      this.info = result;
      if(this.info == "success"){
        alert("El estado de la prueba ha sido modificado");
        location.reload();
      }
    })
  }

  setID(){
    this.id_ = this.he_ID.value['id'];
    //this.test_info = this.aux_test_info;
    let info = this.test_info;
    
    let aux = []
    for(let i=0;i<info.length;i++){
      if(this.id_ == info[i][0]){
        aux.push(info[i])
      }
    }
    this.test_info = aux;
  
  }

  setTime(){
    this.time = this.he_time.value['time'];
    //this.test_info = this.aux_test_info;
    let info = this.test_info;
    let aux = []
    
    for(let i=0;i<info.length;i++){
      let aux_time = info[i][4][0]+info[i][4][1]+info[i][4][2]+info[i][4][3]+info[i][4][4]
      if(this.time == aux_time){
        aux.push(info[i])
      }
    }
    this.test_info = aux;
  }

}
