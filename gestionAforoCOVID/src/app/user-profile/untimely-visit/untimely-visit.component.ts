import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { ParametersService } from 'src/app/services/parameters.service';
import { VisitsService } from 'src/app/services/visits.service';

@Component({
  selector: 'app-untimely-visit',
  templateUrl: './untimely-visit.component.html',
  styleUrls: ['./untimely-visit.component.scss']
})
export class UntimelyVisitComponent implements OnInit {

  constructor(private parameterService: ParametersService, private visitServices : VisitsService, private cookieService : CookieService) { }

  private mask_options = ["SI", "NO"];
  private departments : any;
  private municipalities : any;
  private  neighborhoods : any ;
  private document_types : any;
  private genders = ["Masculino", "Femenino", "Otro"];
  private entry = ["Aceptado", "Rechazado"];


  untimely_visit = new FormGroup({
    name : new FormControl('', Validators.required),
    surname : new FormControl('', Validators.required),
    document  : new FormControl('', Validators.required),
    id : new FormControl('', [Validators.required, Validators.min(0)]),
    gender : new FormControl('', Validators.required),
    department : new FormControl('', Validators.required),
    municipality : new FormControl('', Validators.required),
    neighborhood : new FormControl('', Validators.required),
    address : new FormControl('', Validators.required),
    mask : new FormControl('', Validators.required),
    temperature : new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    time : new FormControl('', Validators.required),
    date : new FormControl('', Validators.required),
    entry : new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    this.parameterService.getDepartments().then(result =>{
      this.departments = result;
    })
    this.parameterService.getmunicipalities().then(result =>{
      this.municipalities = result;
    })
    this.parameterService.getNeighborhoods().then(result =>{
      this.neighborhoods = result;
    })
    this.parameterService.getDocuments().then(result =>{
      this.document_types = result;
    })
  }


  getDepartments(){
    return this.departments;
  }

  getMunicipalities(){
    return this.municipalities;
  }

  getNeighborhoods(){
    return this.neighborhoods;
  }

  getGenders(){
    return this.genders;
  }

  getDocuments(){
    return this.document_types;
  }

  get_mask_options(){
    return this.mask_options;
  }
  private response : any ; 
  register_visit(){
    let token = this.cookieService.get('token');
    let decoded_ = jwtDecode(token);
    this.untimely_visit.value['nit'] = decoded_['id']
    this.untimely_visit.value['establishment_name'] = decoded_['name']
    this.untimely_visit.value['establishment_category'] = decoded_['category']
    this.visitServices.register_untimely_visit(this.untimely_visit).then(result => {
      this.response = result;
      if(this.response == "success"){
        alert("La visita se ha registrado")
      }
      location.reload();
    })
  }

  get_entry(){
    return this.entry;
  }

}
