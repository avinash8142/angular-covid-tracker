import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';
import { CovidSummaryWorld } from '../model/CovidSummaryWorld';
import { CountryWiseInfo } from '../model/CountryWiseInfo';
import { CovidDataService } from '../covid-data.service';
import { Chart } from 'chart.js';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})
export class WorldComponent implements OnInit {

  worldSummaryData: CovidSummaryWorld;
  Countries: CountryWiseInfo[];
  newConfirmedCasesWorld:number;
  totalConfirmedCasesWorld:number;
  newDeathsCasesWorld:number;
  totalDeathsCasesWorld: number;
  newRecoveredCasesWorld: number;
  totalRecoveredCasesWorld:number;
  totalActiveCasesWorld: number;
  newActiveCasesWorld: number; 

  faArrowUp = faArrowUp;

  pieChart : any;
  pieChartLegends = [];
  pieChartToolTip = [];
  pieChartComfirmed = [];
  pieChartDataComfirmed = [];

  pieChartLegendsActive = [];
  pieChartToolTipActive = [];
  pieChartActive = [];
  pieChartDataActive = [];

  pieChartLegendsRecovered = [];
  pieChartToolTipRecovered = [];
  pieChartRecovered = [];
  pieChartDataRecovered = [];

  pieChartLegendsDeceased = [];
  pieChartToolTipDeceased = [];
  pieChartDeceased = [];
  pieChartDataDeceased = [];
  
  today= new Date();
  jstoday = '';

  constructor(private dataService: CovidDataService) { }

  ngOnInit(): void {
    this.jstoday = formatDate(this.today, 'dd-MMM-yyyy, hh:mm:ss a', 'en-US', '+0530');
    this.covidDataByCountry();
  }

  CovidWorldData(data: CovidSummaryWorld){
    this.totalConfirmedCasesWorld = data.Global.TotalConfirmed;
    this.newConfirmedCasesWorld = data.Global.NewConfirmed;
    this.totalDeathsCasesWorld = data.Global.TotalDeaths;
    this.newDeathsCasesWorld = data.Global.NewDeaths;
    this.totalRecoveredCasesWorld = data.Global.TotalRecovered;
    this.newRecoveredCasesWorld = data.Global.NewRecovered;
    this.totalActiveCasesWorld = this.totalConfirmedCasesWorld - (this.totalRecoveredCasesWorld + this.totalDeathsCasesWorld);
    this.newActiveCasesWorld = this.newConfirmedCasesWorld - (this.newRecoveredCasesWorld + this.newDeathsCasesWorld);
 }

 covidDataByCountry() {
   this.dataService.getCovidDataOfWorld().subscribe(data => {
     this.Countries = data.Countries;
     this.Countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
     this.pieChartDataComfirmed = this.Countries.filter((item) => item.TotalConfirmed > 100000);
     this.pieChartComfirmed = this.pieChartDataComfirmed.map((item) => item.TotalConfirmed);
     this.pieChartLegends = this.pieChartDataComfirmed.map((item) => item.CountryCode);
     
     this.pieChart = new Chart('canvasWorldConfirmed', {
       type: 'pie',
       data: {
         labels: this.pieChartLegends,
         datasets: [{
           data: this.pieChartComfirmed,
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
         //circumference : 2 * Math.PI,
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

     this.pieChartDataActive = this.Countries.filter((item) => item.TotalConfirmed - (item.TotalRecovered + item.TotalDeaths) > 50000);
     this.pieChartActive = this.pieChartDataActive.map((item) => item.TotalConfirmed - (item.TotalRecovered + item.TotalDeaths));
     this.pieChartLegendsActive = this.pieChartDataActive.map((item) => item.CountryCode);
     
     console.log('pieChartActive', this.pieChartActive)
     console.log('pieChartLegendsActive', this.pieChartLegendsActive)
     
     this.pieChart = new Chart('canvasWorldActive', {
       type: 'pie',
       data: {
         labels: this.pieChartLegendsActive,
         datasets: [{
           data: this.pieChartActive,
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
         //circumference : 2 * Math.PI,
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

     this.pieChartDataRecovered = this.Countries.filter((item) => item.TotalRecovered > 50000);
     this.pieChartRecovered = this.pieChartDataRecovered.map((item) => item.TotalRecovered);
     this.pieChartLegendsRecovered = this.pieChartDataRecovered.map((item) => item.CountryCode);
   
     this.pieChart = new Chart('canvasWorldRecovered', {
       type: 'pie',
       data: {
         labels: this.pieChartLegendsRecovered,
         datasets: [{
           data: this.pieChartRecovered,
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
         //circumference : 2 * Math.PI,
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

     this.pieChartDataDeceased = this.Countries.filter((item) => item.TotalDeaths > 20000);
     this.pieChartDeceased = this.pieChartDataDeceased.map((item) => item.TotalDeaths);
     this.pieChartLegendsDeceased = this.pieChartDataDeceased.map((item) => item.CountryCode);
     
     this.pieChart = new Chart('canvasWorldDeceased', {
       type: 'pie',
       data: {
         labels: this.pieChartLegendsDeceased,
         datasets: [{
           data: this.pieChartDeceased ,
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
         //circumference : 2 * Math.PI,
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
     this.CovidWorldData(data);

     
   });
 }
}
