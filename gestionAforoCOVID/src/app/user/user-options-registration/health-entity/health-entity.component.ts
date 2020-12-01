import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-health-entity',
  templateUrl: './health-entity.component.html',
  styleUrls: ['./health-entity.component.scss']
})
export class HealthEntityComponent implements OnInit {

  healthEnt = new FormGroup({
    NIT : new FormControl('', Validators.required),
    name : new FormControl('', Validators.required),
    phone : new FormControl('', Validators.required),
    email : new FormControl('', [Validators.required, Validators.email]),
    username : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
    address : new FormControl('', Validators.required),
  })

  constructor(private userService : UserService) { }

  ngOnInit(): void {
  }

  private info: string;
  
  registerHealthEntity(){
    this.userService.sendHealthEntInfo(this.healthEnt).then(result => {
      this.info = result;
      if(this.info== "success"){
        alert("Registro exitoso");
      }
      else if(this.info == "failed"){
        alert("No se ha podido realizar el registro del usuario");
      }
      else{
        alert("Ya existe una entidad de salud con el username o NIT ingresados");
      }
    })
  }

}

