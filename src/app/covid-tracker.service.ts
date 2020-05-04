import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListOfCovids } from './model/ListOfCovids';
import { CovidSummary } from './model/CovidSummary';

@Injectable({
  providedIn: 'root'
})
export class CovidTrackerService {

  constructor(private http: HttpClient) { }

  getCovidDetails():Observable<ListOfCovids>{
    return this.http.get<ListOfCovids>("https://covidtracker-276013.uc.r.appspot.com/covid");
  }

  getCovidSummary():Observable<CovidSummary>{
    return this.http.get<CovidSummary>("https://covidtracker-276013.uc.r.appspot.com/summary");
  }
}
