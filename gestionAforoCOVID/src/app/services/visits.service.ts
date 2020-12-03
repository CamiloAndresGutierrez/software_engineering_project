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
      this.httpClient.post("http://localhost:5200/visit/untimely", visit_info.value , {}).subscribe(data => {
        resolve(data['response']);
      });
    });

  }
}
