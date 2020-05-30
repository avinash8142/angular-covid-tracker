import { Component, OnInit } from '@angular/core';
import { State, District } from './model/ListOfDistrictByState';
import { States } from './model/States';
import { CovidSummaryWorld } from './model/CovidSummaryWorld';
import { CountryWiseInfo } from './model/CountryWiseInfo';
import { CovidSummary } from './model/CovidSummary';
import { Covid } from './model/covid';
import { Chart } from 'chart.js';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { CovidDataService } from './covid-data.service';
import { CovidByDtWrapper } from './model/CovidByDtWrapper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  // title = 'covid-tracker';
  // covidObj: Covid[];
  // barChartData = {};
  // barChartLabels = [];
  // barChartDataConf = [];
  // barChartDataCured = [];
  // barChartType = 'bar';
  // barChartLegend = true;
  // summaryData: CovidSummary;
  // barChartConfirm = [];
  // totalCorfirmedCase: number;
  // totalActiveCase: number;
  // totalRecoveredCase: number;
  // totalFatalCase: number;
  // totalConfirmedCaseDiff: number;
  // totalRecoveredCaseDiff: number;
  // totalFatalCaseDiff: number;
  // totalActiveCaseDiff: number;

  // worldSummaryData: CovidSummaryWorld;
  // Countries: CountryWiseInfo[];
  // newConfirmedCasesWorld:number;
  // totalConfirmedCasesWorld:number;
  // newDeathsCasesWorld:number;
  // totalDeathsCasesWorld: number;
  // newRecoveredCasesWorld: number;
  // totalRecoveredCasesWorld:number;
  // totalActiveCasesWorld: number;
  // newActiveCasesWorld: number; 

  // pieChart : any;
  // pieChartLegends = [];
  // pieChartToolTip = [];
  // pieChartComfirmed = [];
  // pieChartDataComfirmed = []

  // pieChartLegendsActive = [];
  // pieChartToolTipActive = [];
  // pieChartActive = [];
  // pieChartDataActive = []

  // pieChartLegendsRecovered = [];
  // pieChartToolTipRecovered = [];
  // pieChartRecovered = [];
  // pieChartDataRecovered = []

  // pieChartLegendsDeceased = [];
  // pieChartToolTipDeceased = [];
  // pieChartDeceased = [];
  // pieChartDataDeceased = []

  // pieChartLegendsDistricts = [];
  // pieChartToolTipDistricts = [];
  // pieChartComfirmedDistricts = [];
  // pieChartDataComfirmedDistricts = [];

  // lineChartLabel = [];
  // lineChartData = [];
  // lineChartRecoveredCase = [];
  // lineChartFatalCase = [];
  // lineChartActiveCase = [];
  // lineChart: any;

  // states: States[];
  // code: string;
  // caseType: string;
  // lineChartStateConfirmDiff = [];
  // lineChartStateRecoverDiff = [];
  // lineChartStateFatalDiff = [];
  // lineChartStateActiveDiff = [];
  // lineChartStateLabel = [];
  // lineChartState: any;

  // faArrowUp = faArrowUp;

  // stateAndDistrcitWiseData : any;
  // listOfStates = [];
  // listOfDistricts = [];
  // listOfDistrictsInOrangeZone = [];
  // listOfDistrictsInRedZone = [];
  // listOfDistrictsInGreenZone = [];
  // state : State;
  // district : District;

  constructor() { }
  ngOnInit() {
    // this.covidData();
    // this.covidByDt();
    // this.getState();
    //this.covidDataByCountry();
    //this.Covid19IndiaDataByDistrict();
  }

  // Covid19IndiaDataByDistrict(){
  //   this.dataService.getCovid19IndiaDataByDistrict().subscribe(data => {
  //     this.stateAndDistrcitWiseData = data;
  //     console.log('stateAndDistrcitWiseData', this.stateAndDistrcitWiseData)
  //     data.forEach(element => {
  //       this.state = new State() 
  //       this.state.stateCode = element.id;
  //       this.state.stateName = element.state;
  //       this.state.districts = [];
  //       element.districtData.forEach(item => 
  //       {
  //         this.district = new District(); 
  //         this.district.districtCode = item.id;
  //         this.district.districtName = item.name;
  //         this.state.districts.push(this.district);
  //       })
  //       this.listOfStates.push(this.state);
  //       this.listOfStates.sort((a, b) => a.stateName.localeCompare( b.stateName));
  //     });
  //     //console.log('States', this.listOfStates);
  //   });
  // }

  // CovidWorldData(data: CovidSummaryWorld){
  //    this.totalConfirmedCasesWorld = data.Global.TotalConfirmed;
  //    this.newConfirmedCasesWorld = data.Global.NewConfirmed;
  //    this.totalDeathsCasesWorld = data.Global.TotalDeaths;
  //    this.newDeathsCasesWorld = data.Global.NewDeaths;
  //    this.totalRecoveredCasesWorld = data.Global.TotalRecovered;
  //    this.newRecoveredCasesWorld = data.Global.NewRecovered;
  //    this.totalActiveCasesWorld = this.totalConfirmedCasesWorld - (this.totalRecoveredCasesWorld + this.totalDeathsCasesWorld);
  //    this.newActiveCasesWorld = this.newConfirmedCasesWorld - (this.newRecoveredCasesWorld + this.newDeathsCasesWorld);
  // }

  // covidDataByCountry() {
  //   this.dataService.getCovidDataOfWorld().subscribe(data => {
  //     this.Countries = data.Countries;
  //     this.Countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
  //     this.pieChartDataComfirmed = this.Countries.filter((item) => item.TotalConfirmed > 100000);
  //     this.pieChartComfirmed = this.pieChartDataComfirmed.map((item) => item.TotalConfirmed);
  //     this.pieChartLegends = this.pieChartDataComfirmed.map((item) => item.CountryCode);
      
  //     this.pieChart = new Chart('canvasWorldConfirmed', {
  //       type: 'pie',
  //       data: {
  //         labels: this.pieChartLegends,
  //         datasets: [{
  //           data: this.pieChartComfirmed,
  //           borderColor: '#3cba9f',
  //           backgroundColor: ['#239B56', '#1F618D', '#148F77', '#1E8449', '#B7950B', '#DC7633', '#A04000',"#3cb371",  
  //           "#0000FF",  
  //           "#9966FF",  
  //           "#4C4CFF",  
  //           "#00FFFF",  
  //           "#f990a7",  
  //           "#aad2ed",  
  //           "#FF00FF",
  //           'Red',
  //           'Blue'],
  //           fill:true,
  //         }]
  //       },
  //       options: {
  //         legend: {
  //           labels: {
  //             fontColor: '#186A3B',
  //           },
  //           display: false
  //         },
  //         scales: {  
  //           xAxes: [{  
  //             display: false  
  //           }],  
  //           yAxes: [{  
  //             display: false  
  //           }],  
  //         },
  //         //circumference : 2 * Math.PI,
  //         animation: {
  //           animateRotate:true,
  //           animateScale:false
  //         },
  //         elements:{
  //           point:{
  //             radius : 2
  //           }
  //         }
  //       }
  //     });

  //     this.pieChartDataActive = this.Countries.filter((item) => item.TotalConfirmed - (item.TotalRecovered + item.TotalDeaths) > 50000);
  //     this.pieChartActive = this.pieChartDataActive.map((item) => item.TotalConfirmed - (item.TotalRecovered + item.TotalDeaths));
  //     this.pieChartLegendsActive = this.pieChartDataActive.map((item) => item.CountryCode);
      
  //     console.log('pieChartActive', this.pieChartActive)
  //     console.log('pieChartLegendsActive', this.pieChartLegendsActive)
      
  //     this.pieChart = new Chart('canvasWorldActive', {
  //       type: 'pie',
  //       data: {
  //         labels: this.pieChartLegendsActive,
  //         datasets: [{
  //           data: this.pieChartActive,
  //           borderColor: '#3cba9f',
  //           backgroundColor: ['#239B56', '#1F618D', '#148F77', '#1E8449', '#B7950B', '#DC7633', '#A04000',"#3cb371",  
  //           "#0000FF",  
  //           "#9966FF",  
  //           "#4C4CFF",  
  //           "#00FFFF",  
  //           "#f990a7",  
  //           "#aad2ed",  
  //           "#FF00FF",
  //           'Red',
  //           'Blue'],
  //           fill:true,
  //         }]
  //       },
  //       options: {
  //         legend: {
  //           labels: {
  //             fontColor: '#186A3B',
  //           },
  //           display: false
  //         },
  //         scales: {  
  //           xAxes: [{  
  //             display: false  
  //           }],  
  //           yAxes: [{  
  //             display: false  
  //           }],  
  //         },
  //         //circumference : 2 * Math.PI,
  //         animation: {
  //           animateRotate:true,
  //           animateScale:false
  //         },
  //         elements:{
  //           point:{
  //             radius : 2
  //           }
  //         }
  //       }
  //     });

  //     this.pieChartDataRecovered = this.Countries.filter((item) => item.TotalRecovered > 50000);
  //     this.pieChartRecovered = this.pieChartDataRecovered.map((item) => item.TotalRecovered);
  //     this.pieChartLegendsRecovered = this.pieChartDataRecovered.map((item) => item.CountryCode);
    
  //     console.log('pieChartRecovered', this.pieChartRecovered)
  //     console.log('pieChartLegendsRecovered', this.pieChartLegendsRecovered)

  //     this.pieChart = new Chart('canvasWorldRecovered', {
  //       type: 'pie',
  //       data: {
  //         labels: this.pieChartLegendsRecovered,
  //         datasets: [{
  //           data: this.pieChartRecovered,
  //           borderColor: '#3cba9f',
  //           backgroundColor: ['#239B56', '#1F618D', '#148F77', '#1E8449', '#B7950B', '#DC7633', '#A04000',"#3cb371",  
  //           "#0000FF",  
  //           "#9966FF",  
  //           "#4C4CFF",  
  //           "#00FFFF",  
  //           "#f990a7",  
  //           "#aad2ed",  
  //           "#FF00FF",
  //           'Red',
  //           'Blue'],
  //           fill:true,
  //         }]
  //       },
  //       options: {
  //         legend: {
  //           labels: {
  //             fontColor: '#186A3B',
  //           },
  //           display: false
  //         },
  //         scales: {  
  //           xAxes: [{  
  //             display: false  
  //           }],  
  //           yAxes: [{  
  //             display: false  
  //           }],  
  //         },
  //         //circumference : 2 * Math.PI,
  //         animation: {
  //           animateRotate:true,
  //           animateScale:false
  //         },
  //         elements:{
  //           point:{
  //             radius : 2
  //           }
  //         }
  //       }
  //     });

  //     this.pieChartDataDeceased = this.Countries.filter((item) => item.TotalDeaths > 20000);
  //     this.pieChartDeceased = this.pieChartDataDeceased.map((item) => item.TotalDeaths);
  //     this.pieChartLegendsDeceased = this.pieChartDataDeceased.map((item) => item.CountryCode);
      
  //     this.pieChart = new Chart('canvasWorldDeceased', {
  //       type: 'pie',
  //       data: {
  //         labels: this.pieChartLegendsDeceased,
  //         datasets: [{
  //           data: this.pieChartDeceased,
  //           borderColor: '#3cba9f',
  //           backgroundColor: ['#239B56', '#1F618D', '#148F77', '#1E8449', '#B7950B', '#DC7633', '#A04000',"#3cb371",  
  //           "#0000FF",  
  //           "#9966FF",  
  //           "#4C4CFF",  
  //           "#00FFFF",  
  //           "#f990a7",  
  //           "#aad2ed",  
  //           "#FF00FF",
  //           'Red',
  //           'Blue'],
  //           fill:true,
  //         }]
  //       },
  //       options: {
  //         legend: {
  //           labels: {
  //             fontColor: '#186A3B',
  //           },
  //           display: false
  //         },
  //         scales: {  
  //           xAxes: [{  
  //             display: false  
  //           }],  
  //           yAxes: [{  
  //             display: false  
  //           }],  
  //         },
  //         //circumference : 2 * Math.PI,
  //         animation: {
  //           animateRotate:true,
  //           animateScale:false
  //         },
  //         elements:{
  //           point:{
  //             radius : 2
  //           }
  //         }
  //       }
  //     });
  //     this.CovidWorldData(data);

      
  //   });
  // }

  // covidData() {
  //   this.dataService.getCovidData().subscribe(data => {
  //     this.covidObj = data.covids;
  //     this.covidObj.sort((a, b) => b.confirmedCase - a.confirmedCase);
  //     this.barChartDataConf = this.covidObj.filter((item) => item.confirmedCase > 4000);
  //     this.barChartConfirm = this.barChartDataConf.map((item) => item.confirmedCase);
  //     this.barChartLabels = this.barChartDataConf.map((item) => item.stateCode);
  //     this.barChartData = new Chart('canvas', {
  //       type: 'bar',
  //       data: {
  //         labels: this.barChartLabels,
  //         datasets: [{
  //           label: 'Total Confirmed Cases',
  //           data: this.barChartConfirm,
  //           borderColor: '#3cba9f',
  //           backgroundColor: ['#239B56', '#1F618D', '#148F77', '#1E8449', '#B7950B', '#DC7633', '#A04000']
  //         }]
  //       },
  //       options: {
  //         legend: {
  //           labels: {
  //             fontColor: '#186A3B',
  //           },
  //           display: false
  //         },
  //         scales: {
  //           yAxes: [{
  //             ticks: {
  //               beginAtZero: true
  //             }
  //           }]
  //         }
  //       }
  //     });
  //   });
  // }

  // covidSummary(data: CovidByDtWrapper) {
  //   let len = data.covidWraper.length;
  //   this.totalActiveCase = data.covidWraper[len - 1].activeCase;
  //   this.totalCorfirmedCase = data.covidWraper[len - 1].confirmedCase;
  //   this.totalFatalCase = data.covidWraper[len - 1].fatalCase;
  //   this.totalRecoveredCase = data.covidWraper[len - 1].recoveredCase;
  //   this.totalConfirmedCaseDiff = data.covidWraper[len - 1].confirmedDiff;
  //   this.totalActiveCaseDiff = data.covidWraper[len - 1].activeDiff;
  //   this.totalRecoveredCaseDiff = data.covidWraper[len - 1].recoverDiff;
  //   this.totalFatalCaseDiff = data.covidWraper[len - 1].fatalDiff;
  // }

  // covidByDt() {
  //   this.dataService.getCovidByDt().subscribe(data => {
  //     this.lineChartLabel = data.covidWraper.map(t => t.caseDt.substr(0, 5));
  //     this.lineChartData = data.covidWraper.map(t => t.confirmedDiff);
  //     this.lineChartRecoveredCase = data.covidWraper.map(t => t.recoverDiff);
  //     this.lineChartFatalCase = data.covidWraper.map(t => t.fatalDiff);
  //     this.lineChartActiveCase = data.covidWraper.map(t => t.activeDiff);

  //     this.lineChart = new Chart('lineChartId', {
  //       type: 'line',
  //       data: {
  //         labels: this.lineChartLabel,
  //         datasets: [{
  //           label: 'New Cases',
  //           data: this.lineChartData,
  //           borderColor: '#0B5345',
  //           backgroundColor: '#76D7C4',
  //           pointBackgroundColor: '#FDFEFE'
  //         }]
  //       },
  //       options: {
  //         legend: {
  //           labels: {
  //             fontColor: '#145A32',
  //           },
  //           display: false
  //         },
  //         scales: {
  //           yAxes: [{
  //             ticks: {
  //               beginAtZero: false
  //             }
  //           }]
  //         }

  //       }
  //     });
  //     this.covidSummary(data);
  //   });
  // }

  // caseChanged(caseSelected: string) {
  //   if (caseSelected == 'recoveredCase') {
  //     this.lineChart.config.data.datasets[0].data = this.lineChartRecoveredCase;
  //     this.lineChart.config.data.labels = this.lineChartLabel;
  //     this.lineChart.config.data.datasets[0].label = 'Recovered Cases';
  //     this.lineChart.update();
  //   } else if (caseSelected == 'fatalCase') {
  //     this.lineChart.config.data.datasets[0].data = this.lineChartFatalCase;
  //     this.lineChart.config.data.labels = this.lineChartLabel;
  //     this.lineChart.config.data.datasets[0].label = 'Fatal Cases';
  //     this.lineChart.update();
  //   } else if (caseSelected == 'newCase') {
  //     this.lineChart.config.data.datasets[0].data = this.lineChartData;
  //     this.lineChart.config.data.labels = this.lineChartLabel;
  //     this.lineChart.config.data.datasets[0].label = 'New Cases';
  //     this.lineChart.update();
  //   } else if (caseSelected == 'activeCase') {
  //     this.lineChart.config.data.datasets[0].data = this.lineChartActiveCase;
  //     this.lineChart.config.data.labels = this.lineChartLabel;
  //     this.lineChart.config.data.datasets[0].label = 'Active Cases';
  //     this.lineChart.update();
  //   }

  // }

  // getState() {
  //   this.dataService.getStates().subscribe(data => {
  //     this.states = data;
  //     this.code = 'MH';
  //     this.getStateData();
  //   });
  // }

  // stateChanged(st: string) {
  //   this.dataService.getStatesData(st).subscribe(stData => {
  //     this.lineChartStateConfirmDiff = stData.covids.map(t => t.confirmedCaseDiff);
  //     this.lineChartStateFatalDiff = stData.covids.map(t => t.deathDiff);
  //     this.lineChartStateRecoverDiff = stData.covids.map(t => t.curedCaseDiff);
  //     this.lineChartStateLabel = stData.covids.map(t => t.caseDt);
  //     this.lineChartStateActiveDiff = stData.covids.map(t => t.activeCaseDiff);

  //     this.lineChartState.config.data.datasets[0].data = this.lineChartStateConfirmDiff
  //     this.lineChartState.config.data.labels = this.lineChartStateLabel;
  //     this.lineChartState.config.data.datasets[0].label = 'New Cases';
  //     this.lineChartState.update();
  //     this.caseType = 'newCase';
  //   });
  // }

  // caseChangedForState(caseState: string) {
  //   if (caseState == 'recoveredCase') {
  //     this.lineChartState.config.data.datasets[0].data = this.lineChartStateRecoverDiff;
  //     this.lineChartState.config.data.labels = this.lineChartStateLabel;
  //     this.lineChartState.config.data.datasets[0].label = 'Recovered Cases';
  //     this.lineChartState.update();
  //   } else if (caseState == 'fatalCase') {
  //     this.lineChartState.config.data.datasets[0].data = this.lineChartStateFatalDiff;
  //     this.lineChartState.config.data.labels = this.lineChartStateLabel;
  //     this.lineChartState.config.data.datasets[0].label = 'Fatal Cases';
  //     this.lineChartState.update();
  //   } else if (caseState == 'newCase') {
  //     this.lineChartState.config.data.datasets[0].data = this.lineChartStateConfirmDiff
  //     this.lineChartState.config.data.labels = this.lineChartStateLabel;
  //     this.lineChartState.config.data.datasets[0].label = 'New Cases';
  //     this.lineChartState.update();
  //   }
  //   else if (caseState == 'activeCase') {
  //     this.lineChartState.config.data.datasets[0].data = this.lineChartStateActiveDiff
  //     this.lineChartState.config.data.labels = this.lineChartStateLabel;
  //     this.lineChartState.config.data.datasets[0].label = 'Active Cases';
  //     this.lineChartState.update();
  //   }
  // }

  // getStateData() {
  //   this.dataService.getStatesData(this.code).subscribe(data => {
  //     this.lineChartStateConfirmDiff = data.covids.map(t => t.confirmedCaseDiff);
  //     this.lineChartStateFatalDiff = data.covids.map(t => t.deathDiff);
  //     this.lineChartStateRecoverDiff = data.covids.map(t => t.curedCaseDiff);
  //     this.lineChartStateActiveDiff = data.covids.map(t => t.activeCaseDiff);
  //     this.lineChartStateLabel = data.covids.map(t => t.caseDt);
  //     this.caseType = 'newCase';
  //     this.lineChartState = new Chart('lineChartStateId', {
  //       type: 'line',
  //       data: {
  //         labels: this.lineChartStateLabel,
  //         datasets: [{
  //           label: 'New Cases',
  //           data: this.lineChartStateConfirmDiff,
  //           borderColor: '#78281F',
  //           backgroundColor: '#FDEDEC',
  //           pointBackgroundColor: '#FDFEFE'
  //         }]
  //       },
  //       options: {
  //         legend: {
  //           labels: {
  //             fontColor: '#145A32',
  //           },
  //           display: false
  //         },
  //         scales: {
  //           yAxes: [{
  //             ticks: {
  //               beginAtZero: false
  //             }
  //           }]
  //         }

  //       }
  //     });

  //   });
  // }

  // getDistrict(st: string) {
  //   this.pieChartDataComfirmedDistricts = (this.stateAndDistrcitWiseData.find(element =>  element.id == st ).districtData)
  //                                           .filter(element => element.confirmed > 100);
  //   this.pieChartComfirmedDistricts = this.pieChartDataComfirmedDistricts.map((item) => item.confirmed);
  //   this.pieChartLegendsDistricts = this.pieChartDataComfirmedDistricts.map((item) => item.id)
    
  //   this.pieChart = new Chart('canvasIndiaDistrict', {
  //       type: 'pie',
  //       data: {
  //         labels: this.pieChartLegendsDistricts,
  //         datasets: [{
  //           data: this.pieChartComfirmedDistricts,
  //           borderColor: '#3cba9f',
  //           backgroundColor: ['#239B56', '#1F618D', '#148F77', '#1E8449', '#B7950B', '#DC7633', '#A04000',"#3cb371",  
  //           "#0000FF",  
  //           "#9966FF",  
  //           "#4C4CFF",  
  //           "#00FFFF",  
  //           "#f990a7",  
  //           "#aad2ed",  
  //           "#FF00FF",
  //           'Red',
  //           'Blue'],
  //           fill:true,
  //         }]
  //       },
  //       options: {
  //         legend: {
  //           labels: {
  //             fontColor: '#186A3B',
  //           },
  //           display: false
  //         },
  //         scales: {  
  //           xAxes: [{  
  //             display: false  
  //           }],  
  //           yAxes: [{  
  //             display: false  
  //           }],  
  //         },
  //         //circumference : 2 * Math.PI,
  //         animation: {
  //           animateRotate:true,
  //           animateScale:false
  //         },
  //         elements:{
  //           point:{
  //             radius : 2
  //           }
  //         }
  //       }
  //     }); 
    
  //   this.listOfDistricts = this.stateAndDistrcitWiseData.find(element =>  element.id == st ).districtData;

  //   this.listOfDistrictsInRedZone = this.listOfDistricts.filter(element => element.zone == "RED");
  //   this.listOfDistrictsInOrangeZone = this.listOfDistricts.filter(element => element.zone == "ORANGE");
  //   this.listOfDistrictsInGreenZone = this.listOfDistricts.filter(element => element.zone == "GREEN");
  // }
}
