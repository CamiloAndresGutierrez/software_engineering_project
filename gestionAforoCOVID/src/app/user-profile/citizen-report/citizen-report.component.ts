import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ParametersService } from 'src/app/services/parameters.service';
import { ReportServiceService } from 'src/app/services/report-service.service';

@Component({
  selector: 'app-citizen-report',
  templateUrl: './citizen-report.component.html',
  styleUrls: ['./citizen-report.component.scss']
})
export class CitizenReportComponent implements OnInit {

  private citizenReport:any;
  private documents : any;
  private aux_citizenReport : any;
  private doc:string="";

  document = new FormGroup({
    document_name : new FormControl('', Validators.required)
  })

  constructor(private reportService : ReportServiceService, private parameterService : ParametersService) { }

  ngOnInit(): void {
    this.reportService.get_citizen_report().then(result =>{
      this.citizenReport = result;
      this.aux_citizenReport = result;
    })
    this.parameterService.getDocuments().then(result => {
      this.documents = result;
    })
  }
  
  getReport(){
    return this.citizenReport;
  }

  getDocuments(){
    return this.documents;
  }

  setDocument(){
    this.doc = this.document.value['document_name'];
    //this.visit_info = this.aux_visit_info;
    let info = this.citizenReport;
    console.log(info);
    
    let aux = []
    for(let i=0;i<info.length;i++){
      if(this.doc == info[i][1]){
        aux.push(info[i])
      }
    }
    this.citizenReport = aux;
  }

  deleteFilter(){
    this.citizenReport = this.aux_citizenReport;
  }

}
