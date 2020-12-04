import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { ParametersService } from 'src/app/services/parameters.service';
import { VisitsService } from 'src/app/services/visits.service';

@Component({
  selector: 'app-manual-visit',
  templateUrl: './manual-visit.component.html',
  styleUrls: ['./manual-visit.component.scss']
})
export class ManualVisitComponent implements OnInit {

  manual_visit = new FormGroup({
    document : new FormControl('', Validators.required),
    id : new FormControl('', Validators.required),
    mask : new FormControl('', Validators.required),
    temperature : new FormControl('', Validators.required),
    nit : new FormControl(''),
    establishment_name : new FormControl(''),
    establishment_category : new FormControl(''),
  })
  
  private documents : any;
  private mask_options = ["SI", "NO"];

  constructor(private parameterService : ParametersService, private visitService : VisitsService, private cookieService : CookieService) { }

  ngOnInit(): void {
    this.parameterService.getDocuments().then(result => {
      this.documents = result;
    })

  }

  getDocuments(){
    return this.documents;
  }

  get_mask_options(){
    return this.mask_options;
  }

  register_visit(){
    let token = this.cookieService.get('token');
    let decoded_ = jwtDecode(token);
    this.manual_visit.value['nit'] = decoded_['id']
    this.manual_visit.value['establishment_name'] = decoded_['name']
    this.manual_visit.value['establishment_category'] = decoded_['category']
    
    this.visitService.manual_visit(this.manual_visit).then(result => {
      if(result == "success"){
        alert("La visita se ha registrado exitosamente.");
      }
      else if(result == "failed"){
        alert("El usuario no existe.");
      }
      else{
        alert("El usuario no puede ingresar al establecimiento público.")
      }
    })
  }

}
