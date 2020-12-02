import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ParametersService } from 'src/app/services/parameters.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss']
})
export class CreateAdminComponent implements OnInit {

  constructor(private userService : UserService, private parameterService: ParametersService) { }

  private document_types : any;
  private info : string;

  adminRegistration = new FormGroup({
    "name" : new FormControl('', Validators.required),
    "surname" : new FormControl('', Validators.required),
    "username" : new FormControl('', Validators.required),
    "password" : new FormControl('', Validators.required),
    "document" : new FormControl('', Validators.required),
    "id" : new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.parameterService.getDocuments().then(result => {
      this.document_types = result
    })
  }
  
  getDocuments(){
    return this.document_types;
  }

  registerAdmin(){
    this.userService.sendAdminInfo(this.adminRegistration).then(result => {
      this.info = result
      if(this.info== "success"){
        alert("Registro exitoso");
      }
      else if(this.info == "failed"){
        alert("No se ha podido realizar el registro del administrador");
      }
      else{
        alert("Ya existe un usuario con el username o número de documento ingresados");
      }
    })
  }

}
