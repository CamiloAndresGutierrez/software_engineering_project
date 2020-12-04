import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { VisitsService } from 'src/app/services/visits.service';

@Component({
  selector: 'app-citizen-visit',
  templateUrl: './citizen-visit.component.html',
  styleUrls: ['./citizen-visit.component.scss']
})
export class CitizenVisitComponent implements OnInit {


  private visit_info : any ;
  private date : string = "";
  private aux_visit_info : any;

  constructor(private cookieService : CookieService, private visitService : VisitsService) { }

  citizen_visit = new FormGroup({
    date : new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    let token = this.cookieService.get('token');
    let decoded_ = jwtDecode(token);
    this.visitService.get_visits(decoded_['id'], decoded_['document']).then(result => {
      this.visit_info = result;
      this.aux_visit_info = result;
    })
  }

  getVisit(){
    return this.visit_info;
  }

  setDate(){
    this.date = this.citizen_visit.value['date'];
    this.visit_info = this.aux_visit_info;
    let info = this.visit_info;
    let aux = []
    for(let i=0;i<info.length;i++){
      if(this.date == info[i][1]){
        aux.push(info[i])
      }
    }
    
    this.visit_info = aux;
  }

  deleteFilter(){
    this.visit_info = this.aux_visit_info;
  }
}
