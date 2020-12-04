import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { VisitsService } from 'src/app/services/visits.service';

@Component({
  selector: 'app-establishment-visit',
  templateUrl: './establishment-visit.component.html',
  styleUrls: ['./establishment-visit.component.scss']
})
export class EstablishmentVisitComponent implements OnInit {

  private visit_info : any ;
  private date : string = "";
  private aux_visit_info : any;
  private id_citizen : string = "";
  private time_citizen : string = "";
  private entry_citizen : string = "";
  private entry_options = ["Aprobado", "Rechazado"]

  constructor(private cookieService : CookieService, private visitService : VisitsService) { }

  citizen_visit = new FormGroup({
    date : new FormControl('', Validators.required)
  })

  citizen_id = new FormGroup({
    id : new FormControl('', Validators.required)
  })
  
  citizen_time = new FormGroup({
    time : new FormControl('', Validators.required)
  })

  citizen_entry = new FormGroup({
    entry : new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    let token = this.cookieService.get('token');
    let decoded_ = jwtDecode(token);
    
    this.visitService.get_visits_PE(decoded_['id']).then(result => {
      this.visit_info = result;
      this.aux_visit_info = result;
    })
  }

  getEntryOptions(){
    return this.entry_options;
  }

  getVisit(){
    return this.visit_info;
  }

  setDate(){
    this.date = this.citizen_visit.value['date'];
    //this.visit_info = this.aux_visit_info;
    let info = this.visit_info;
    let aux = []
    for(let i=0;i<info.length;i++){
      if(this.date == info[i][6]){
        aux.push(info[i])
      }
    }
    this.visit_info = aux;
  }

  deleteFilter(){
    this.visit_info = this.aux_visit_info;
  }

  setTime(){
    this.time_citizen = this.citizen_time.value['time'];
    //this.visit_info = this.aux_visit_info;
    let info = this.visit_info;
    let aux = []
    for(let i=0;i<info.length;i++){
      let aux_time = info[i][7][0]+info[i][7][1]+info[i][7][2]+info[i][7][3]+info[i][7][4]
      if(this.time_citizen == aux_time){
        aux.push(info[i])
      }
    }
    this.visit_info = aux;
  }
  
  setID(){
    this.id_citizen = this.citizen_id.value['id'];
    //this.visit_info = this.aux_visit_info;
    let info = this.visit_info;
    let aux = []
    for(let i=0;i<info.length;i++){
      if(this.id_citizen == info[i][1]){
        aux.push(info[i])
      }
    }
    this.visit_info = aux;
  }

  setEntry(){
    this.entry_citizen = this.citizen_entry.value['entry'];
    //this.visit_info = this.aux_visit_info;
    let info = this.visit_info;
    let aux = []
    console.log(info);
    
    for(let i=0;i<info.length;i++){
      if(this.entry_citizen == info[i][8]){
        aux.push(info[i])
      }
    }
    this.visit_info = aux;
  }

}
