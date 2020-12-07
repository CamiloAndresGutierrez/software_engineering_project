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
      this.httpClient.post("http://13.58.72.66:5000/login", loginInfo.value , {}).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public sendEstablishmentInfo(establishmentInfo:FormGroup): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://13.58.72.66:5000/registration/establishment", establishmentInfo.value , {}).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public sendCitizenInfo(citizenInfo:FormGroup): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://13.58.72.66:5000/registration/citizen", citizenInfo.value , {}).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public sendHealthEntInfo(healthEntityInfo:FormGroup): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://13.58.72.66:5000/registration/healthEntity", healthEntityInfo.value , {}).subscribe(data => {
        resolve(data['response']);
      });
    });
  }
  
  public sendAdminInfo(adminInfo:FormGroup): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://13.58.72.66:5000/add/admin", adminInfo.value , {}).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public get_pending(): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.get("http://13.58.72.66:5000/get/pending").subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public accept_pending(nit : string): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://13.58.72.66:5000/accept/pending", {"NIT" : nit}).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public reject_pending(nit : string): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://13.58.72.66:5000/reject/pending", {"NIT" : nit}).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public get_accounts(): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.get("http://13.58.72.66:5000/user-state").subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public manage_account(nit : string, username : string, veredict: string): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://13.58.72.66:5000/user-state", {"NIT" : nit, "username": username, "veredict" : veredict}).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public modify_establishment_info(info : FormGroup): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://13.58.72.66:5000/modify-info/establishment", info.value).subscribe(data => {
        resolve(data['response']);
      });
    });
  }


  public modify_citizen_info(info : FormGroup): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://13.58.72.66:5000/modify-info/citizen", info.value).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public modify_healthE_info(info : FormGroup): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://13.58.72.66:5000/modify-info/health-entity", info.value).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public modify_admin(info : FormGroup): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://13.58.72.66:5000/modify-info/admin", info.value).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

}
