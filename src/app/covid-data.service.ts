import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {
  public urlCovid = 'https://covidtracker-276013.uc.r.appspot.com/';
  constructor(public http: HttpClient) { }

  getCovidData(): Observable<any> {
    return this.http.get(this.urlCovid + 'covid');
  }
  getCovidSummary(): Observable<any> {
    return this.http.get(this.urlCovid + 'summary');
  }
}
