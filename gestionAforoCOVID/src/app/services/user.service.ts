import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient : HttpClient) { }

   public getInfo(loginInfo : FormGroup): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://localhost:5000/login", loginInfo.value , {}).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public sendEstablishmentInfo(establishmentInfo:FormGroup): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://localhost:5000/registration/establishment", establishmentInfo.value , {}).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public sendCitizenInfo(citizenInfo:FormGroup): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://localhost:5000/registration/citizen", citizenInfo.value , {}).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public sendHealthEntInfo(healthEntityInfo:FormGroup): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://localhost:5000/registration/healthEntity", healthEntityInfo.value , {}).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

}
