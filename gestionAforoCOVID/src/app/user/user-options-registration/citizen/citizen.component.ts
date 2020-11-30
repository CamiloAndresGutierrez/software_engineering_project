import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-citizen',
  templateUrl: './citizen.component.html',
  styleUrls: ['./citizen.component.scss']
})
export class CitizenComponent implements OnInit {

  private genders = ["Masculino", "Femenino", "Otro"]

  citizenRegistration = new FormGroup({
    name : new FormControl('', Validators.required),
    surname : new FormControl('', Validators.required),
    username : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
    id : new FormControl('', Validators.required),
    address : new FormControl('', Validators.required),
    gender : new FormControl('', Validators.required)
  })

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    
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
        alert("El username ya está siendo usado, escoja otro");
      }
    })
  }

  getGenders(){
    return this.genders;
  }

}
