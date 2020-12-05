import { Component, OnInit } from '@angular/core';
import { ReportServiceService } from 'src/app/services/report-service.service';
import * as XLSX from 'xlsx';
import * as html2pdf from 'html2pdf.js'


@Component({
  selector: 'app-health-entity-report',
  templateUrl: './health-entity-report.component.html',
  styleUrls: ['./health-entity-report.component.scss']
})
export class HealthEntityReportComponent implements OnInit {

  private HE_report : any;
  private fileName = "reporteEntidades.xlsx"

  constructor(private reportService : ReportServiceService) { }

  ngOnInit(): void {
    this.reportService.get_HE_report().then(result => {
      this.HE_report = result;
    })
  }

  getReport(){
    return this.HE_report;
  }

  downloadTableExcel(){
    let table = document.getElementById('reportTable');
    const ws : XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);

    const wb : XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, this.fileName);

  }

  downloadTablePDF(){
    const options = {
      filename : "reporteEntidades.pdf",
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
