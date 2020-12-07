import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  constructor(private httpClient : HttpClient) { }

  public get_visit_report() : Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.get("http://3.20.225.166:5400/report/visit").subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public get_tests_report() : Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.get("http://3.20.225.166:5400/report/tests").subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public get_citizen_report() : Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.get("http://3.20.225.166:5400/report/citizen").subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public get_establishment_report() : Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.get("http://3.20.225.166:5400/report/establishment").subscribe(data => {
        resolve(data['response']);
      });
    });
  } 
  
  public get_HE_report() : Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.get("http://3.20.225.166:5400/report/health-entity").subscribe(data => {
        resolve(data['response']);
      });
    });
  }  

}