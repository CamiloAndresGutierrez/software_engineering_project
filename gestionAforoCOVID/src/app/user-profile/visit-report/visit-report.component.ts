import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportServiceService } from 'src/app/services/report-service.service';
import * as XLSX from 'xlsx';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-visit-report',
  templateUrl: './visit-report.component.html',
  styleUrls: ['./visit-report.component.scss']
})
export class VisitReportComponent implements OnInit {
  
  constructor(private reportservice : ReportServiceService) { }
  
  visit_report : any;
  aux_visit_report : any;
  date : string = "";
  entry_result : string = "";
  entry = ["Aprobado", "Rechazado"];


  date_info = new FormGroup({
    date : new FormControl('', Validators.required)
  })

  entry_options = new FormGroup({
    choice : new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.reportservice.get_visit_report().then(result =>{
      this.visit_report = result;
      this.aux_visit_report = result;
    })
  }

  getReport(){
    return this.visit_report;
  }

  setDate(){
    this.date = this.date_info.value['date'];
    //this.visit_info = this.aux_visit_info;
    let info = this.visit_report;
    console.log(info);
    
    let aux = []
    for(let i=0;i<info.length;i++){
      if(this.date == info[i][9]){
        aux.push(info[i])
      }
    }
    
    this.visit_report = aux;
  }

  deleteFilter(){
    this.visit_report = this.aux_visit_report;
  }

  getEntryOption(){
    return this.entry;
  }

  setCategory(){
    this.entry_result = this.entry_options.value['choice'];
    //this.visit_info = this.aux_visit_info;
    let info = this.visit_report;
    console.log(info);
    
    let aux = []
    for(let i=0;i<info.length;i++){
      if(this.entry_result == info[i][4]){
        aux.push(info[i])
      }
    }
    this.visit_report = aux;
  }
  private fileName = "reporteVisitas.xlsx"

  downloadTableExcel(){
      let table = document.getElementById('reportTable');
      const ws : XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);

      const wb : XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      XLSX.writeFile(wb, this.fileName);

    }



  downloadTablePDF(){
    const options = {
      filename : "reporteVisitas.pdf",
      image : {type : 'jpeg'},
      html2canvas : {},
      jsPDF : {orientation: 'landscape'}
    };

    const content : Element = document.getElementById('reportTable');

    html2pdf()
      .from(content)
      .set(options)
      .save();
  }

}
