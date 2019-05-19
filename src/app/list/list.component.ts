import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ContractService } from '../contract.service';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
import { Contract } from '../contract';
import { environment } from 'src/environments/environment';

// API End Point
const apiEndpoint = environment.apiEndpoint;


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})


export class ListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  tblListColumns: string[] = [
    "vendorName",
    "jobName",
    "signatureDate",
    "stationNumberFrom",
    "stationNumberTo",
    "createdDate",
    "pdfUrl"
  ];
  tblListSource = new MatTableDataSource([]);

  filterVM: any = {};

  


  constructor(private _contractService: ContractService) { }


  ngOnInit() {
    //this.filterVM.vendorName = "Nitin Kumar";
    this.getContracts(this.filterVM);
  }

  private getContracts(filter: any) {
    this._contractService.getContracts(filter).subscribe(res => {
      var list = res;
      this.tblListSource.data = res;
      this.tblListSource.paginator = this.paginator;
      console.log(list);
    });
  }

  getTableData() {

    console.log('FilterVM - ' + this.filterVM);

    if ((this.filterVM.jobName != undefined && this.filterVM.jobName != '') || (this.filterVM.dateFrom != undefined && this.filterVM.dateFrom != '') || (this.filterVM.dateTo != undefined && this.filterVM.dateTo != '') || (this.filterVM.stationNumberFrom != undefined && this.filterVM.stationNumberFrom != '') || (this.filterVM.stationNumberTo != undefined && this.filterVM.stationNumberTo != '')) {
      console.log('Bingo Valid information');

      // Calling API to get data
      this.getContracts(this.filterVM);

    }
    else {
      console.log('Not Valid information');
      alert('please select at least one value')
    }

  }
  downloadPDF(pdfPath) {
    if (pdfPath != null && pdfPath != '' && pdfPath != undefined) {
      window.open(apiEndpoint+pdfPath);
    }
    else{
      alert('pdf file path is null, pelase contact to admin');
    }

  }


}