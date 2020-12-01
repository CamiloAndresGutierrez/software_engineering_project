import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormGroup } from '@angular/forms';

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
}
