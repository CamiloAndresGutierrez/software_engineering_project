import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { ParametersService } from 'src/app/services/parameters.service';
import { TestsService } from 'src/app/services/tests.service';

@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.scss']
})
export class NewTestComponent implements OnInit {

  private documents : any ; 
  private HE_name : string;
  private nit : string;

  constructor(private cookieService : CookieService, private parameterService : ParametersService, private testService : TestsService) { }
  
  ngOnInit(): void {
    this.parameterService.getDocuments().then(result => {
      this.documents = result;
    })
    let token = this.cookieService.get('token');
    let decoded_ = jwtDecode(token);
    this.HE_name = decoded_['name']
    this.nit = decoded_['id']

  }

  new_test = new FormGroup({
    document : new FormControl('', Validators.required),
    id : new FormControl('', Validators.required),
    date : new FormControl('', Validators.required),
    time : new FormControl('', Validators.required),
  })

  getDocuments(){
    return this.documents;
  }

  getHE_name(){
    return this.HE_name;
  }

  getHE_id(){
    return this.nit;
  }

  private info : string;

  send_test(){
    this.testService.register_test(this.new_test.value['id'], this.new_test.value['document'], this.new_test.value['date'], this.new_test.value['time'], this.HE_name, this.nit).then(result => {
      this.info = result;
      if(this.info == "success"){
        alert("Prueba agregada exitosamente");
        location.reload();
      }
    })
  }


 

}
