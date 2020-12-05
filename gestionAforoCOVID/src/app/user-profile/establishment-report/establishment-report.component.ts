import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ParametersService } from 'src/app/services/parameters.service';
import { ReportServiceService } from 'src/app/services/report-service.service';

@Component({
  selector: 'app-establishment-report',
  templateUrl: './establishment-report.component.html',
  styleUrls: ['./establishment-report.component.scss']
})
export class EstablishmentReportComponent implements OnInit {

  private est_reports : any;
  private aux_est_reports : any;
  private categories_list : any;
  private category :string="";

  categories = new FormGroup({
    category : new FormControl('', Validators.required)
  })

  constructor(private reportService : ReportServiceService, private parameterService : ParametersService) { }

  ngOnInit(): void {
    this.reportService.get_establishment_report().then(result => {
      this.est_reports = result;
      this.aux_est_reports = result;
    })
    this.parameterService.getCategories().then(result => {
      this.categories_list = result;
    })
    
  }

  getReport(){
    return this.est_reports;
  }

  getCategories(){
    return this.categories_list;
  }

  setCategory(){
    this.category = this.categories.value['category'];
    //this.visit_info = this.aux_visit_info;
    let info = this.est_reports;
    
    let aux = []
    for(let i=0;i<info.length;i++){
      if(this.category == info[i][8]){
        aux.push(info[i])
      }
    }
    this.est_reports = aux;
  }
    

  deleteFilter(){
    this.est_reports = this.aux_est_reports;
  }

}
