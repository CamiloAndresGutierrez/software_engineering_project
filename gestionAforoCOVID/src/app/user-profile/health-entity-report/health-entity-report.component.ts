import { Component, OnInit } from '@angular/core';
import { ReportServiceService } from 'src/app/services/report-service.service';

@Component({
  selector: 'app-health-entity-report',
  templateUrl: './health-entity-report.component.html',
  styleUrls: ['./health-entity-report.component.scss']
})
export class HealthEntityReportComponent implements OnInit {

  private HE_report : any;

  constructor(private reportService : ReportServiceService) { }

  ngOnInit(): void {
    this.reportService.get_HE_report().then(result => {
      this.HE_report = result;
    })
  }

  getReport(){
    return this.HE_report;
  }

}
