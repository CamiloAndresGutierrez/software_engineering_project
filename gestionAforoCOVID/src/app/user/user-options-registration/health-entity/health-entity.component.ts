import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ParametersService } from 'src/app/services/parameters.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-health-entity',
  templateUrl: './health-entity.component.html',
  styleUrls: ['./health-entity.component.scss']
})
export class HealthEntityComponent implements OnInit {

  private departments : any;
  private municipalities : any;
  private  neighborhoods : any ;

  healthEnt = new FormGroup({
    NIT : new FormControl('', Validators.required),
    name : new FormControl('', Validators.required),
    phone : new FormControl('', Validators.required),
    email : new FormControl('', [Validators.required, Validators.email]),
    username : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
    address : new FormControl('', Validators.required),
    departments : new FormControl('', Validators.required),
    municipalities : new FormControl('', Validators.required),
    neighborhoods : new FormControl('', Validators.required)
  })

  constructor(private userService : UserService, private parameterService : ParametersService) { }

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
  }

  private info: string;
  
  registerHealthEntity(){
    this.userService.sendHealthEntInfo(this.healthEnt).then(result => {
      this.info = result;
      if(this.info== "success"){
        alert("Su solicitud de registro ha sido registrada");
      }
      else if(this.info == "failed"){
        alert("No se ha podido realizar el registro del usuario");
      }
      else{
        alert("Ya existe una entidad de salud con el username o NIT ingresados");
      }
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


}

