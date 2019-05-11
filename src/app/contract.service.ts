import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  const httpMultipartOptions = {
    headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
  };

@Injectable({
  providedIn: "root"
})
export class ContractService {
  constructor(private _http: HttpClient) {}

  private contractUrl = "http://localhost:3000/contract/save";

  postContractApi(data): Observable<any> {
    return this._http.post<any>(
      this.contractUrl,
      data,
      httpOptions
    );
  }

  // postTestApi(data): Observable<any> {
  //   //alert(" service calling");
  //   return this._http.post<any>(
  //     this.contractUrl,
  //     data,
  //     httpOptions
  //   );
  // }
}
