import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ParametersService } from 'src/app/services/parameters.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-citizen',
  templateUrl: './citizen.component.html',
  styleUrls: ['./citizen.component.scss']
})
export class CitizenComponent implements OnInit {

  private genders = ["Masculino", "Femenino", "Otro"]
  private document_types : any;

  citizenRegistration = new FormGroup({
    name : new FormControl('', Validators.required),
    surname : new FormControl('', Validators.required),
    username : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
    id : new FormControl('', Validators.required),
    address : new FormControl('', Validators.required),
    gender : new FormControl('', Validators.required),
    document : new FormControl('', Validators.required)
  })

  constructor(private userService : UserService, private parameterService : ParametersService) { }

  ngOnInit(): void {
    
    this.parameterService.getDocuments().then(result =>{
      this.document_types = result;
    })
  }

  private info = "";

  public registerCitizen()  {
    this.userService.sendCitizenInfo(this.citizenRegistration).then(result => {
      this.info = result;
      if(this.info== "success"){
        alert("Registro exitoso");
      }
      else if(this.info == "failed"){
        alert("No se ha podido realizar el registro del usuario");
      }
      else{
        alert("Ya existe un usuario con el username o número de documento ingresados");
      }
    })
  }

  getGenders(){
    return this.genders;
  }

  getDocuments(){
    return this.document_types;
  }

}
