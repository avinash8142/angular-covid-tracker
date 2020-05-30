import { Component, OnInit } from '@angular/core';
import { State, District } from '../model/ListOfDistrictByState';
import { CovidDataService } from '../covid-data.service';
import { formatDate } from '@angular/common';
import { Chart } from 'chart.js';
import { States } from '../model/States';
import { Covid } from '../model/covid';
import { CovidSummary } from '../model/CovidSummary';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  covidObj: Covid[];
  barChartData = {};
  barChartLabels = [];
  barChartDataConf = [];
  barChartDataCured = [];
  barChartType = 'bar';
  barChartLegend = true;
  summaryData: CovidSummary;
  barChartConfirm = [];

  stateAndDistrcitWiseData : any;
  listOfStates = [];
  listOfDistricts = [];
  listOfDistrictsInOrangeZone = [];
  listOfDistrictsInRedZone = [];
  listOfDistrictsInGreenZone = [];
  state : State;
  district : District;

  states: States[];
  code: string;
  caseType: string;

  today = new Date();
  jstoday = '';
  stateCode : string;
  StateWithMaxConfirmedCases : string;

  pieChartIndia : any;
  pieChartLegendsDistricts = [];
  pieChartToolTipDistricts = [];
  pieChartComfirmedDistricts = [];
  pieChartDataComfirmedDistricts = [];

  lineChartStateConfirmDiff = [];
  lineChartStateRecoverDiff = [];
  lineChartStateFatalDiff = [];
  lineChartStateActiveDiff = [];
  lineChartStateLabel = [];
  lineChartState: any;

  constructor(private dataService: CovidDataService) { }

  ngOnInit(): void {
    this.jstoday = formatDate(this.today, 'dd-MMM-yyyy, hh:mm:ss a', 'en-US', '+0530');
    this.covidData();
    this.getState()
    this.Covid19IndiaDataByDistrict();
  }

  covidData() {
    this.dataService.getCovidData().subscribe(data => {
      this.covidObj = data.covids;
      this.covidObj.sort((a, b) => b.confirmedCase - a.confirmedCase);
      this.barChartDataConf = this.covidObj.filter((item) => item.confirmedCase > 4000);
      this.barChartConfirm = this.barChartDataConf.map((item) => item.confirmedCase);
      this.barChartLabels = this.barChartDataConf.map((item) => item.stateCode);
      this.StateWithMaxConfirmedCases = (this.barChartDataConf.map((item) => item.state))[0];
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

  Covid19IndiaDataByDistrict(){
    this.dataService.getCovid19IndiaDataByDistrict().subscribe(data => {
      this.stateAndDistrcitWiseData = data;
      data.forEach(element => {
        this.state = new State() 
        this.state.stateCode = element.id;
        this.state.stateName = element.state;
        this.state.districts = [];
        element.districtData.forEach(item => 
        {
          this.district = new District(); 
          this.district.districtCode = item.id;
          this.district.districtName = item.name;
          this.state.districts.push(this.district);
        })
        this.listOfStates.push(this.state);
        this.listOfStates.sort((a, b) => a.stateName.localeCompare( b.stateName));
      });
      this.stateCode = 'IN-MH';
      this.listOfStates = this.listOfStates.filter(item => item.stateName != 'Unknown*')
      this.getDistrict(this.stateCode);
    });
  }

  getDistrict(st: string) {
    this.pieChartDataComfirmedDistricts = (this.stateAndDistrcitWiseData.find(element =>  element.id == st ).districtData)
                                            .filter(element => element.confirmed > 100);
    this.pieChartComfirmedDistricts = this.pieChartDataComfirmedDistricts.map((item) => item.confirmed);
    this.pieChartLegendsDistricts = this.pieChartDataComfirmedDistricts.map((item) => item.id)
    
    this.pieChartIndia = new Chart('canvasIndiaDistrict', {
        type: 'pie',
        data: {
          labels: this.pieChartLegendsDistricts,
          datasets: [{
            data: this.pieChartComfirmedDistricts,
            borderColor: '#3cba9f',
            backgroundColor: ['#239B56', '#1F618D', '#148F77', '#1E8449', '#B7950B', '#DC7633', '#A04000',"#3cb371",  
            "#0000FF",  
            "#9966FF",  
            "#4C4CFF",  
            "#00FFFF",  
            "#f990a7",  
            "#aad2ed",  
            "#FF00FF",
            'Red',
            'Blue'],
            fill:true,
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
            xAxes: [{  
              display: false  
            }],  
            yAxes: [{  
              display: false  
            }],  
          },
          circumference : 2 * Math.PI,
          animation: {
            animateRotate:true,
            animateScale:false
          },
          elements:{
            point:{
              radius : 2
            }
          }
        }
      }); 
    
    this.listOfDistricts = this.stateAndDistrcitWiseData.find(element =>  element.id == st ).districtData;

    this.listOfDistrictsInRedZone = this.listOfDistricts.filter(element => element.zone == "RED");
    this.listOfDistrictsInOrangeZone = this.listOfDistricts.filter(element => element.zone == "ORANGE");
    this.listOfDistrictsInGreenZone = this.listOfDistricts.filter(element => element.zone == "GREEN");
  }
}
