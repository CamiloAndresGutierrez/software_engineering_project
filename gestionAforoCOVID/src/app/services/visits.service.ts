import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VisitsService {

  constructor(private httpClient : HttpClient) { }

  public register_untimely_visit(visit_info : FormGroup) : Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://3.20.225.166:5200/visit/untimely", visit_info.value , {}).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public manual_visit(visit_info : FormGroup) : Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://3.20.225.166:5200/visit/manual", visit_info.value , {}).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public get_visits(id : number, document : string) : Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://3.20.225.166:5200/citizen/visit", {"id" : id, "document": document} , {}).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public get_visits_PE(nit : string) : Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://3.20.225.166:5200/establishment/visit", {"nit" : nit} , {}).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

}
