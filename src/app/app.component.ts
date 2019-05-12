import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { SignaturePad } from "angular2-signaturepad/signature-pad";
import { ContractService } from "./contract.service";
import { OwlDateTime } from 'ng-pick-datetime/date-time/date-time.class';
import { environment } from 'src/environments/environment.prod';


// API End URL
const apiEndpoint = environment.apiEndpoint;


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})


export class AppComponent {
  // Set loading when making request
  loading: boolean = false;

  // Model which will post to api 
  model: any = {};

  // Check Signature Done or Not
  drawnSignature: boolean = false;
  drawnKmSignature: boolean = false;

  // Signature Pad
  @ViewChild('sigpad1') signaturePad: SignaturePad;
  @ViewChild('sigpad2') signaturePad2: SignaturePad;
  @ViewChild('content') content: ElementRef;


  // Signature 
  private signaturePadOptions: Object = {
    // passed through to szimek/signature_pad constructor
    minWidth: 0.5,
    canvasWidth: 400,
    canvasHeight: 120,
    dotSize: 2,
    backgroundColor: 'rgb(220,220,220)'
  };

  private signaturePadOptions2: Object = {
    // passed through to szimek/signature_pad constructor
    minWidth: 0.5,
    canvasWidth: 400,
    canvasHeight: 120,
    dotSize: 2,
    backgroundColor: 'rgb(220,220,220)'
  };

  constructor(private _contractService: ContractService) {
    // Set Signature Date default
    this.model.signatureDate = new Date();
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
    this.drawnSignature = true;
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
    this.drawnKmSignature = true;
  }

  // Signature
  drawStart2() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log("begin drawing");
  }



  // Save Form Dat and Genereate PDF
  save() {

    console.log("saving");
    this.loading = true;

    this.model.signature = this.signaturePad.toDataURL();
    this.model.kmSignature = this.signaturePad2.toDataURL();

    if (this.drawnSignature == false || this.drawnKmSignature == false) {
      this.loading = false;
      alert('Please sign before submitting the form!')
      return;
    }

    console.log(this.model);

    this._contractService.postContractApi(this.model).subscribe(data => {

      console.log("saved");
      console.log(data);

      this.model = {
        pdf: apiEndpoint + data.pdf.replace("./", "")
      }

      // reset details
      this.loading = false;
      this.spClear();
      this.drawnSignature = false;
      this.drawnKmSignature = false;
      
      alert('Saved Successfully');

      // Open PFD in seprate tab
      window.open(this.model.pdf, '_blank');

    });
  }

}
