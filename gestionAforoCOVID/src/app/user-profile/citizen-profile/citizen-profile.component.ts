import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { ParametersService } from 'src/app/services/parameters.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-citizen-profile',
  templateUrl: './citizen-profile.component.html',
  styleUrls: ['./citizen-profile.component.scss']
})
export class CitizenProfileComponent implements OnInit {
  private genders = ["Masculino", "Femenino", "Otro"]
  private document_types : any;
  private departments : any;
  private municipalities : any;
  private  neighborhoods : any ; 

  constructor(private userService : UserService,private parameterService : ParametersService, private cookieService : CookieService) { }

  citizenRegistration = new FormGroup({
    name : new FormControl('', Validators.required),
    surname : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
    address : new FormControl('', Validators.required),
    gender : new FormControl('', Validators.required),
    department : new FormControl('', Validators.required),
    municipality : new FormControl('', Validators.required),
    neighbourhood : new FormControl('', Validators.required)
  })

  ngOnInit(): void {
      
    this.parameterService.getDocuments().then(result =>{
      this.document_types = result;
    })
    this.parameterService.getDepartments().then(result =>{
      this.departments = result;
    })
    this.parameterService.getmunicipalities().then(result =>{
      this.municipalities = result;
    })
    this.parameterService.getNeighborhoods().then(result =>{
      this.neighborhoods = result;
    })
  }


  logOut(){
    this.cookieService.delete("token", "/");
    location.reload();
  }

  registerCitizen(){
    let token = this.cookieService.get('token');
    let decoded_ = jwtDecode(token);
    this.citizenRegistration.value['id'] = decoded_['id']
    this.citizenRegistration.value['document'] = decoded_['document']
    
    this.userService.modify_citizen_info(this.citizenRegistration).then(result => {
      if(result=="success"){
        alert("La información del ciudadano ha sido modificada");
        location.reload();
      }
    })
  } 

  getGenders(){
    return this.genders;
  }

  getDocuments(){
    return this.document_types;
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

}
