// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
//   title = 'kindermorgan';
// }

import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { SignaturePad } from "angular2-signaturepad/signature-pad";
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";
import { FormBuilder, FormGroup } from '@angular/forms';


import { ContractService } from "./contract.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  loading:boolean=false;
  model: any = {};

//@ViewChild(SignaturePad) signaturePad: SignaturePad;
  @ViewChild('sigpad1') signaturePad: SignaturePad;
  @ViewChild('sigpad2') signaturePad2: SignaturePad;

  @ViewChild('content') content: ElementRef;



  private signaturePadOptions: Object = {
    // passed through to szimek/signature_pad constructor
    minWidth: 0.5,
    canvasWidth: 200,
    canvasHeight: 50,
    dotSize: 2,
    backgroundColor:'rgb(220,220,220)'
  };


  private signaturePadOptions2: Object = {
    // passed through to szimek/signature_pad constructor
    minWidth: 0.5,
    canvasWidth: 200,
    canvasHeight: 50,
    dotSize: 2,
    backgroundColor:'rgb(220,220,220)'
  };

  constructor(private _contractService: ContractService) {
    // no-op
    // this.model = new Contract();
    // console.log(this.model);

  }
  //Clear Signature
  spClear() {
    this.signaturePad.clear();
    this.signaturePad2.clear();
  }

  // Clease Signature
  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set("minWidth", 0.5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API


    this.signaturePad2.set("minWidth", 0.5); // set szimek/signature_pad options at runtime
    this.signaturePad2.clear(); // invoke functions from szimek/signature_pad API
  }

  // Signature Complete
  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
  }

  // Signature
  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log("begin drawing");
  }


  // Signature Complete
  drawComplete2() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad2.toDataURL());
  }

  // Signature
  drawStart2() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log("begin drawing");
  }

  // PFD
  public captureScreen() {
    this.loading=true;
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)

      let fileName = this.model.jobName+'_'+ new Date().toLocaleString()+".pdf";

      pdf.save(fileName); // Generated PDF
      this.loading=false;
    });
   // this.loading=false;
  }

  // Save Data
  save() {
    console.log("saving");

    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')

      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      // var pdfFile = pdf.output('datauristring'); // Generated PDF
      var pdfFile = btoa(pdf.output('datauristring')); // Generated PDF
      console.log('pdfFile - '+pdfFile);
      const fileName = this.model.jobName+'-'+ new Date().toLocaleDateString()+".pdf";

      // this.model.pdfFile=pdfFile;
      // this.model.fileName=fileName;


    this.model.signature=this.signaturePad.toDataURL();
    this.model.kmSignature=this.signaturePad2.toDataURL();
    //this.model.htmlData = document.getElementById('contentToConvert');

    // const formData = new FormData();
    // formData.append('pdfFile', pdfFile);
    // formData.append('model', this.model);

    console.log(this.model);

    // this._contractService.postTestApi(this.model).subscribe(data=>{
    //   console.log("saved");
    //   console.log(data);
    //   alert('Saved Successfully');
    // });


    this._contractService.postContractApi(this.model).subscribe(data=>{
      console.log("saved");
      console.log(data);
      alert('Saved Successfully');
    });


  });

  }

}
