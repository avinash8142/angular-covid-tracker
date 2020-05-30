import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CovidByDtWrapper } from './model/CovidByDtWrapper';
import { ListOfCovids } from './model/ListOfCovids';
import { States } from './model/States';
import { CovidSummaryWorld } from './model/CovidSummaryWorld';
import { HttpHeaders } from '@angular/common/http';
import { Covid19IndiaDataByState } from './model/Covid19IndiaDataByState';

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {
  // public urlCovid = 'https://covidtracker-276013.uc.r.appspot.com/';
  public baseUrl = 'https://covid-tracker-dev.web.app';
  // public baseUrl = 'http://localhost:8080';
  constructor(public http: HttpClient) { }

  getCovidData(): Observable<ListOfCovids> {
    return this.http.get<ListOfCovids>(this.baseUrl + '/covid/info');
  }
  getCovidByDt():Observable<CovidByDtWrapper>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      })
    };
    return this.http.get<CovidByDtWrapper>(this.baseUrl+'/covid/cases',httpOptions);
  }
  getStates():Observable<States[]>{
    return this.http.get<States[]>(this.baseUrl+'/covid/listofstate');
  }
  getStatesData(state:string):Observable<ListOfCovids>{
    return this.http.get<ListOfCovids>(this.baseUrl+'/covid/state?stateCode='+state);
  }

  getCovidDataOfWorld(): Observable<CovidSummaryWorld>{
    return this.http.get<CovidSummaryWorld>('https://api.covid19api.com/summary');
  }

  getCovid19IndiaDataByDistrict(): Observable<Covid19IndiaDataByState[]>{
    return this.http.get<Covid19IndiaDataByState[]>('https://api.covidindiatracker.com/state_data.json');
  }
}
