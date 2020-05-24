import { Component, OnInit } from '@angular/core';
import { CovidDataService } from '../app/covid-data.service';
import { Chart } from 'chart.js';
import { CovidSummary } from './model/CovidSummary';
import { CovidByDtWrapper } from './model/CovidByDtWrapper';
import { Covid } from './model/covid';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { States } from './model/States';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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

  faArrowUp = faArrowUp;

  constructor(private dataService: CovidDataService) { }
  ngOnInit() {
    this.covidData();
    this.covidByDt();
    this.getState();


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

  getState() {
    this.dataService.getStates().subscribe(data => {
      this.states = data;
      this.code = 'MH';
      this.getStateData();
    });
  }

  stateChanged(st: string) {
    this.dataService.getStatesData(st).subscribe(stData => {
      this.lineChartStateConfirmDiff = stData.covids.map(t => t.confirmedCaseDiff);
      this.lineChartStateFatalDiff = stData.covids.map(t => t.deathDiff);
      this.lineChartStateRecoverDiff = stData.covids.map(t => t.curedCaseDiff);
      this.lineChartStateLabel = stData.covids.map(t => t.caseDt);
      this.lineChartStateActiveDiff = stData.covids.map(t => t.activeCaseDiff);

      this.lineChartState.config.data.datasets[0].data = this.lineChartStateConfirmDiff
      this.lineChartState.config.data.labels = this.lineChartStateLabel;
      this.lineChartState.config.data.datasets[0].label = 'New Cases';
      this.lineChartState.update();
      this.caseType = 'newCase';
    });
  }

  caseChangedForState(caseState: string) {
    if (caseState == 'recoveredCase') {
      this.lineChartState.config.data.datasets[0].data = this.lineChartStateRecoverDiff;
      this.lineChartState.config.data.labels = this.lineChartStateLabel;
      this.lineChartState.config.data.datasets[0].label = 'Recovered Cases';
      this.lineChartState.update();
    } else if (caseState == 'fatalCase') {
      this.lineChartState.config.data.datasets[0].data = this.lineChartStateFatalDiff;
      this.lineChartState.config.data.labels = this.lineChartStateLabel;
      this.lineChartState.config.data.datasets[0].label = 'Fatal Cases';
      this.lineChartState.update();
    } else if (caseState == 'newCase') {
      this.lineChartState.config.data.datasets[0].data = this.lineChartStateConfirmDiff
      this.lineChartState.config.data.labels = this.lineChartStateLabel;
      this.lineChartState.config.data.datasets[0].label = 'New Cases';
      this.lineChartState.update();
    }
    else if (caseState == 'activeCase') {
      this.lineChartState.config.data.datasets[0].data = this.lineChartStateActiveDiff
      this.lineChartState.config.data.labels = this.lineChartStateLabel;
      this.lineChartState.config.data.datasets[0].label = 'Active Cases';
      this.lineChartState.update();
    }
  }

  getStateData() {
    this.dataService.getStatesData(this.code).subscribe(data => {
      this.lineChartStateConfirmDiff = data.covids.map(t => t.confirmedCaseDiff);
      this.lineChartStateFatalDiff = data.covids.map(t => t.deathDiff);
      this.lineChartStateRecoverDiff = data.covids.map(t => t.curedCaseDiff);
      this.lineChartStateActiveDiff = data.covids.map(t => t.activeCaseDiff);
      this.lineChartStateLabel = data.covids.map(t => t.caseDt);
      this.caseType = 'newCase';
      this.lineChartState = new Chart('lineChartStateId', {
        type: 'line',
        data: {
          labels: this.lineChartStateLabel,
          datasets: [{
            label: 'New Cases',
            data: this.lineChartStateConfirmDiff,
            borderColor: '#78281F',
            backgroundColor: '#FDEDEC',
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

    });
  }
}
