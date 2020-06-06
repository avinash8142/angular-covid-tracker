import { Component, OnInit } from '@angular/core';
import { CovidDataService } from '../covid-data.service';
import { State, District } from '../model/ListOfDistrictByState';
import { Covid } from '../model/covid';
import { CovidSummary } from '../model/CovidSummary';
import { States } from '../model/States';
import { Chart } from 'chart.js';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import {formatDate } from '@angular/common';
import { CovidByDtWrapper } from '../model/CovidByDtWrapper';

@Component({
  selector: 'app-india',
  templateUrl: './india.component.html',
  styleUrls: ['./india.component.css']
})
export class IndiaComponent implements OnInit {

  title = 'covid-tracker';
  covidObj: Covid[];
  barChartData = {};
  barChartLabels = [];
  barChartDataConf = [];
  barChartDataCured = [];
  barChartType = 'bar';
  barChartLegend = true;
  summaryData: CovidSummary;
  barChartConfirm = [];
  totalCorfirmedCase: number;
  totalActiveCase: number;
  totalRecoveredCase: number;
  totalFatalCase: number;
  totalConfirmedCaseDiff: number;
  totalRecoveredCaseDiff: number;
  totalFatalCaseDiff: number;
  totalActiveCaseDiff: number;

  lineChartLabel = [];
  lineChartData = [];
  lineChartRecoveredCase = [];
  lineChartFatalCase = [];
  lineChartActiveCase = [];
  lineChart: any;

  states: States[];
  code: string;
  caseType: string;
  lineChartStateConfirmDiff = [];
  lineChartStateRecoverDiff = [];
  lineChartStateFatalDiff = [];
  lineChartStateActiveDiff = [];
  lineChartStateLabel = [];
  lineChartState: any;

  faArrowUpIndia = faArrowUp;
  
  stateAndDistrcitWiseData : any;
  listOfStates = [];
  listOfDistricts = [];
  listOfDistrictsInOrangeZone = [];
  listOfDistrictsInRedZone = [];
  listOfDistrictsInGreenZone = [];
  state : State;
  district : District;

  pieChartIndia : any;
  pieChartLegendsDistricts = [];
  pieChartToolTipDistricts = [];
  pieChartComfirmedDistricts = [];
  pieChartDataComfirmedDistricts = [];

  today = new Date();
  jstoday = '';
  stateCode : string;

  constructor(private dataService: CovidDataService) { }

  ngOnInit(): void {
    this.jstoday = formatDate(this.today, 'dd-MMM-yyyy, hh:mm:ss a', 'en-US', '+0530');
    this.covidData();
    this.covidByDt();
  }

  covidData() {
    this.dataService.getCovidData().subscribe(data => {
      this.covidObj = data.covids;
      this.covidObj.sort((a, b) => b.confirmedCase - a.confirmedCase);
      this.barChartDataConf = this.covidObj.filter((item) => item.confirmedCase > 4000);
      this.barChartConfirm = this.barChartDataConf.map((item) => item.confirmedCase);
      this.barChartLabels = this.barChartDataConf.map((item) => item.stateCode);
      this.barChartData = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: this.barChartLabels,
          datasets: [{
            label: 'Total Confirmed Cases',
            data: this.barChartConfirm,
            borderColor: '#3cba9f',
            backgroundColor: ['#239B56', '#1F618D', '#148F77', '#1E8449', '#B7950B', '#DC7633', '#A04000']
          }]
        },
        options: {
          legend: {
            labels: {
              fontColor: '#186A3B',
            },
            display: false
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    });
  }

  covidSummary(data: CovidByDtWrapper) {
    let len = data.covidWraper.length;
    this.totalActiveCase = data.covidWraper[len - 1].activeCase;
    this.totalCorfirmedCase = data.covidWraper[len - 1].confirmedCase;
    this.totalFatalCase = data.covidWraper[len - 1].fatalCase;
    this.totalRecoveredCase = data.covidWraper[len - 1].recoveredCase;
    this.totalConfirmedCaseDiff = data.covidWraper[len - 1].confirmedDiff;
    this.totalActiveCaseDiff = data.covidWraper[len - 1].activeDiff;
    this.totalRecoveredCaseDiff = data.covidWraper[len - 1].recoverDiff;
    this.totalFatalCaseDiff = data.covidWraper[len - 1].fatalDiff;

    // if(this.totalConfirmedCaseDiff < 0){
    //     this.faArrowConfirmed = faArrowDown;
    //     console.log(this.totalConfirmedCaseDiff) 
    // }
    // else{
    //   this.faArrowConfirmed = faArrowUp;
    // }
    // if(this.totalActiveCaseDiff < 0){
    //   this.faArrowActive = faArrowDown; 
    // }
    // else{
    //   this.faArrowActive = faArrowUp;
    // }
    // if(this.totalRecoveredCaseDiff < 0){
    //   this.faArrowRecovered = faArrowDown; 
    // }
    // else{
    //   this.faArrowRecovered = faArrowUp;
    // }
    // if(this.totalFatalCaseDiff < 0){
    //   this.faArrowDeceased = faArrowDown; 
    // }
    // else{
    //   this.faArrowDeceased = faArrowUp;
    // }
  }

  covidByDt() {
    this.dataService.getCovidByDt().subscribe(data => {
      this.lineChartLabel = data.covidWraper.map(t => t.caseDt.substr(0, 5));
      this.lineChartData = data.covidWraper.map(t => t.confirmedDiff);
      this.lineChartRecoveredCase = data.covidWraper.map(t => t.recoverDiff);
      this.lineChartFatalCase = data.covidWraper.map(t => t.fatalDiff);
      this.lineChartActiveCase = data.covidWraper.map(t => t.activeDiff);

      this.lineChart = new Chart('lineChartId', {
        type: 'line',
        data: {
          labels: this.lineChartLabel,
          datasets: [{
            label: 'New Cases',
            data: this.lineChartData,
            borderColor: '#0B5345',
            backgroundColor: '#76D7C4',
            pointBackgroundColor: '#FDFEFE'
          }]
        },
        options: {
          legend: {
            labels: {
              fontColor: '#145A32',
            },
            display: false
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: false
              }
            }]
          }

        }
      });
      this.covidSummary(data);
    });
  }

  caseChanged(caseSelected: string) {
    if (caseSelected == 'recoveredCase') {
      this.lineChart.config.data.datasets[0].data = this.lineChartRecoveredCase;
      this.lineChart.config.data.labels = this.lineChartLabel;
      this.lineChart.config.data.datasets[0].label = 'Recovered Cases';
      this.lineChart.update();
    } else if (caseSelected == 'fatalCase') {
      this.lineChart.config.data.datasets[0].data = this.lineChartFatalCase;
      this.lineChart.config.data.labels = this.lineChartLabel;
      this.lineChart.config.data.datasets[0].label = 'Fatal Cases';
      this.lineChart.update();
    } else if (caseSelected == 'newCase') {
      this.lineChart.config.data.datasets[0].data = this.lineChartData;
      this.lineChart.config.data.labels = this.lineChartLabel;
      this.lineChart.config.data.datasets[0].label = 'New Cases';
      this.lineChart.update();
    } else if (caseSelected == 'activeCase') {
      this.lineChart.config.data.datasets[0].data = this.lineChartActiveCase;
      this.lineChart.config.data.labels = this.lineChartLabel;
      this.lineChart.config.data.datasets[0].label = 'Active Cases';
      this.lineChart.update();
    }

  }
}
