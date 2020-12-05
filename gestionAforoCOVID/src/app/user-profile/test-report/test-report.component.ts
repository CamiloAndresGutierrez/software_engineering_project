import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportServiceService } from 'src/app/services/report-service.service';
import * as XLSX from 'xlsx';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-test-report',
  templateUrl: './test-report.component.html',
  styleUrls: ['./test-report.component.scss']
})
export class TestReportComponent implements OnInit {

  test_report : any;
  aux_test_report : any;
  date:string="";
  date_info = new FormGroup({
    date : new FormControl('', Validators.required)
  })
  
  constructor(private reportService : ReportServiceService) { }
  
  ngOnInit(): void {
    this.reportService.get_tests_report().then(result => {
      this.test_report = result;
      this.aux_test_report = result;
    })
  }
  
  getReport(){
    return this.test_report;
  }
  
  setDate(){
    this.date = this.date_info.value['date'];
    //this.visit_info = this.aux_visit_info;
    let info = this.test_report;
    
    let aux = []
    for(let i=0;i<info.length;i++){
      if(this.date == info[i][4]){
        aux.push(info[i])
      }
    }
    this.test_report = aux;
  }

  deleteFilter(){
    this.test_report=this.aux_test_report
  }

  private fileName = "reportePruebas.xlsx"

  downloadTableExcel(){
    let table = document.getElementById('reportTable');
    const ws : XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);

    const wb : XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, this.fileName);

  }


  downloadTablePDF(){
    const options = {
      filename : "reportePruebas.pdf",
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
