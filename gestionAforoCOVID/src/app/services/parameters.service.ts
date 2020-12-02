import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Form, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {

  constructor(private httpClient : HttpClient) { }

  public getDocuments(): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.get("http://localhost:5100/get/document").subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public getDepartments(): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.get("http://localhost:5100/get/department").subscribe(data => {
        resolve(data['response']);
      });
    });
  }
  
  public getmunicipalities(): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.get("http://localhost:5100/get/municipality").subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public getNeighborhoods(): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.get("http://localhost:5100/get/neighborhood").subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public getCategories(): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.get("http://localhost:5100/get/category").subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public getQuarantine(): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.get("http://localhost:5100/quarantine").subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public setQuarantine(q : number): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://localhost:5100/quarantine", {"days" : q}).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public new_document(doc : string): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://localhost:5100/add/document", {"document" : doc}).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public delete_document(doc : string): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://localhost:5100/delete/document", {"document" : doc}).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public new_category(cat : string): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://localhost:5100/add/category", {"category" : cat}).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public delete_category(id : string): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://localhost:5100/delete/category", {"category" : id}).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public new_municipality(municipality_info : FormGroup): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://localhost:5100/add/municipality", municipality_info.value).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public delete_municipality(code : string, department : string): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://localhost:5100/delete/municipality", {"code" : code ,"department" : department}).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public new_neighborhood(neighborhood : FormGroup): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://localhost:5100/add/neighborhood", neighborhood.value).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public delete_neighborhood(name : string): Promise<string> {
    
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://localhost:5100/delete/neighborhood", {"neighborhood" : name}).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public new_department(department : FormGroup): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://localhost:5100/add/department", department.value).subscribe(data => {
        resolve(data['response']);
      });
    });
  }

  public delete_department(code : number): Promise<string> {
    return new Promise<string>((resolve, reject)=>{
      this.httpClient.post("http://localhost:5100/delete/department", {"code" : code}).subscribe(data => {
        resolve(data['response']);
      });
    });
  }


}
