import { environment } from './../../../environments/environment';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stocks } from 'src/app/models/Stocks';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }


  getstockDetails() : Observable<Stocks[]>
  {

    return this.http.get<Stocks[]>(environment.stockApiUrl, {headers:this.getHeaderDetails()});
  }

  addStockDetails(stockName:String, currentPrice:number) : Observable<Stocks>
  {

     var body = { stockName:stockName, currentPrice: currentPrice}
    return this.http.post<Stocks>(environment.stockApiUrl,JSON.stringify(body),{headers:this.getHeaderDetails()});
  }

  getStockDetailsById(stockId:number)
  {
    console.log("Stock Id" +stockId)
    const url = `${environment.stockApiUrl}/${stockId}`;
    return this.http.get<Stocks[]>(url, {headers:this.getHeaderDetails()});
  }


  getHeaderDetails(): HttpHeaders
  {
       let headers =  new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'); // create header object
       headers = headers.append( 'Accept', 'application/json'); // add a new header, creating a new object
       headers = headers.append('Authorization', `${sessionStorage.getItem('token')}`);
       return headers;
  }


}
