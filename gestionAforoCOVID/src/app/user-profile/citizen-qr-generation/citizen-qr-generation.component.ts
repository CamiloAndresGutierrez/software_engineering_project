import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-citizen-qr-generation',
  templateUrl: './citizen-qr-generation.component.html',
  styleUrls: ['./citizen-qr-generation.component.scss']
})
export class CitizenQrGenerationComponent implements OnInit {

  constructor(private cookieService : CookieService) { }

  elementType = NgxQrcodeElementTypes.CANVAS;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value : any;
  scale = 8;

  ngOnInit(): void {
    let token = this.cookieService.get('token')
    let decoded_=jwtDecode(token);
    let doc=decoded_['document'];
    let id_=decoded_['id'];
    this.value = '{"document":' + doc + ', "id":' + String(id_) ;
  }

  downloadTablePDF(){
    const options = {
      filename : "código de ciudadano.pdf",
      image : {type : 'jpeg'},
      html2canvas : {},
      jsPDF : {orientation: 'landscape'}
    };

    const content : Element = document.getElementById('qrcontainer');

    html2pdf()
      .from(content)
      .set(options)
      .save();
  }

}
