import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { Contract } from './contract';

// API End Point
const apiEndpoint = environment.apiEndpoint;


// Ser http request header
const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };


@Injectable({
  providedIn: "root"
})
export class ContractService {
  constructor(private _http: HttpClient) {}

  private contractUrl = apiEndpoint+"contract/save";
  private contractListUrl = apiEndpoint+"contract/list";


  postContractApi(data): Observable<any> {
    return this._http.post<any>(
      this.contractUrl,
      data,
      httpOptions
    );
  }

  getContracts(modelData: any): Observable<Contract[]> {
    return this._http.post<Contract[]>(
      this.contractListUrl,
      modelData,
      httpOptions
    );
  }


}
