import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { ParametersService } from 'src/app/services/parameters.service';
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
  private categories : any;
  private category : string = "";

  constructor(private cookieService : CookieService, private visitService : VisitsService, private parameterService : ParametersService) { }

  citizen_visit = new FormGroup({
    date : new FormControl('', Validators.required)
  })

  category_options =new FormGroup({
    choice : new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    let token = this.cookieService.get('token');
    let decoded_ = jwtDecode(token);
    this.visitService.get_visits(decoded_['id'], decoded_['document']).then(result => {
      this.visit_info = result;
      this.aux_visit_info = result;
    })
    this.parameterService.getCategories().then(result => {
      this.categories = result;
    })
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
      if(this.date == info[i][3]){
        aux.push(info[i])
      }
    }
    
    this.visit_info = aux;
  }

  setCategory(){
    this.category = this.category_options.value['choice'];
    //this.visit_info = this.aux_visit_info;
    let info = this.visit_info;
    console.log(this.category);
    
    let aux = []
    for(let i=0;i<info.length;i++){
      if(this.category == info[i][2]){
        aux.push(info[i])
      }
    }
    
    this.visit_info = aux;
  }

  deleteFilter(){
    this.visit_info = this.aux_visit_info;
  }

  getCategories(){
    return this.categories;
  }
}
