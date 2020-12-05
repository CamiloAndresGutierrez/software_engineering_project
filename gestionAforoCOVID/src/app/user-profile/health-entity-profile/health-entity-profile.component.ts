import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { ParametersService } from 'src/app/services/parameters.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-health-entity-profile',
  templateUrl: './health-entity-profile.component.html',
  styleUrls: ['./health-entity-profile.component.scss']
})
export class HealthEntityProfileComponent implements OnInit {
  private departments : any;
  private municipalities : any;
  private  neighborhoods : any ; 
  private categories : any;

  HERegistration = new FormGroup({
    name : new FormControl(''),
    phone : new FormControl(''),
    email : new FormControl(''),
    password : new FormControl(''),
    department : new FormControl(''),
    municipality : new FormControl(''),
    neighborhood : new FormControl(''),
    address : new FormControl('')
  })


  constructor(private cookieService : CookieService, private parameterService : ParametersService, private userService : UserService) { }

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
    this.parameterService.getCategories().then(result =>{
      this.categories = result;
    })
  }

  logOut(){
    this.cookieService.delete("token", "/");
    location.reload();
  }

  registerHE(){
    let token = this.cookieService.get('token');
    let decoded_ = jwtDecode(token);
    this.HERegistration.value['NIT'] = decoded_['id']
    
    this.userService.modify_healthE_info(this.HERegistration).then(result => {
      if(result=="success"){
        alert("La información del establecimiento ha sido modificada");
        location.reload();
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

  getCategories(){
    return this.categories;
  }

}
