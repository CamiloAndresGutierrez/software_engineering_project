import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestsService {

  constructor(private httpClient : HttpClient) { }

  public register_test(id : string, document : string , date : string, time : string, HE_name : string, nit : string) : Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://3.20.225.166:5300/add/test", {"id" : id, "document" : document, "date" : date, "time" : time, "HE_name" : HE_name, "nit" : nit} , {}).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public get_citizen_test(id : number , document : string) : Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://3.20.225.166:5300/get/test/citizen", {"id" : id, "document" : document} , {}).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public get_HE_test(nit : string) : Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://3.20.225.166:5300/get/test/health-entity", {"nit" : nit}).subscribe(data => {
        resolve(data['response']);
      });
    });
  } 
  
  public change_state(id : number, doc : string, date : string, time : string, state : string) : Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://3.20.225.166:5300/modify/test", {"id" : id, 'document' : doc, 'date' : date, 'time' : time, 'state' : state } , {}).subscribe(data => {
        resolve(data['response']);
      });
    });
  } 
  
}
