import { Component, OnInit } from '@angular/core';
import { CovidDataService } from '../app/covid-data.service';
import {Chart} from 'chart.js';
import { CovidSummary } from './model/CovidSummary';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'covid-tracker';
  covidObj = [];
  barChartData = {};
  barChartLabels = [];
  barChartDataConf = [];
  barChartDataCured = [];
  barChartType = 'bar';
  barChartLegend = true;
  summaryData :CovidSummary;
  totalCorfirmedCase:number;
  totalRecoveredCase:number;
  totalFatalCase:number;

  constructor(private dataService: CovidDataService) {
  }
  ngOnInit() {
    this.covidData();
    this.covidSummary();
  }
  covidData() {
    this.dataService.getCovidData().subscribe((data: any) => {
      this.covidObj = data.covids;
      this.covidObj.sort((a, b) => b.confirmedCase - a.confirmedCase);
      this.covidObj.forEach((item) => this.barChartLabels.push(item.state));
      this.covidObj.forEach((item) => this.barChartDataConf.push(item.confirmedCase ));
      this.barChartData = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: this.barChartLabels,
          datasets: [{
            label: 'Covid19 Chart',
            data: this.barChartDataConf,
            borderColor: '#3cba9f',
            backgroundColor: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
            '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
            '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
            '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
            '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
            '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
            '#E666B3', '#33991A'],
          }]
        },
        options: {
          legend: {
            labels: {
              fontColor: 'blue',
            }
          }
        },
      });
    });
  }
  covidSummary() {
    this.dataService.getCovidSummary().subscribe((data) => {
      this.summaryData = data;
      this.totalCorfirmedCase=this.summaryData.totalCorfirmedCase;
      this.totalRecoveredCase=this.summaryData.totalRecoveredCase;
      this.totalFatalCase=this.summaryData.totalFatalCase;
    });
  }
}
