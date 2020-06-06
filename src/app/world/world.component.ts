import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';
import { CovidSummaryWorld } from '../model/CovidSummaryWorld';
import { CountryWiseInfo } from '../model/CountryWiseInfo';
import { CovidDataService } from '../covid-data.service';
import { Chart } from 'chart.js';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { element } from 'protractor';

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

  newConfirmedCasesCountry:number;
  totalConfirmedCasesCountry:number;
  newDeathsCasesCountry:number;
  totalDeathsCasesCountry: number;
  newRecoveredCasesCountry: number;
  totalRecoveredCasesCountry:number;
  totalActiveCasesCountry: number;
  newActiveCasesCountry: number; 
  CountryCode: string


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
    this.CovidDataofAllCountry();
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

 CovidDataofAllCountry() {
   this.dataService.getCovidDataOfWorld().subscribe(data => {
     this.Countries = data.Countries;
     this.Countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
     this.pieChartDataComfirmed = this.Countries.filter((item) => item.TotalConfirmed > 100000);
     this.pieChartComfirmed = this.pieChartDataComfirmed.map((item) => item.TotalConfirmed);
     //this.pieChartLegends = this.pieChartDataComfirmed.map((item) => item.Country);
     this.pieChartLegends = this.pieChartDataComfirmed.map((item) => ((item.Country).length > 15 ? item.CountryCode : item.Country));
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
     //this.pieChartLegendsActive = this.pieChartDataActive.map((item) => item.CountryCode);
     this.pieChartLegendsActive = this.pieChartDataActive.map((item) => ((item.Country).length > 15 ? item.CountryCode : item.Country));

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
     //this.pieChartLegendsRecovered = this.pieChartDataRecovered.map((item) => item.CountryCode);
     this.pieChartLegendsRecovered = this.pieChartDataRecovered.map((item) => ((item.Country).length > 15 ? item.CountryCode : item.Country));

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
     //this.pieChartLegendsDeceased = this.pieChartDataDeceased.map((item) => item.CountryCode);
     this.pieChartLegendsDeceased = this.pieChartDataDeceased.map((item) => ((item.Country).length > 15 ? item.CountryCode : item.Country));
     
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
     this.CountryCode = 'US'
     this.GetCovidDataByCountry(this.CountryCode);   
   });
 }

 GetCovidDataByCountry(countryCode: string){
    let countryData = this.Countries.find(element => element.CountryCode == countryCode);
    this.totalConfirmedCasesCountry = countryData.TotalConfirmed;
    this.newConfirmedCasesCountry = countryData.NewConfirmed;
    this.totalRecoveredCasesCountry = countryData.TotalRecovered;
    this.newRecoveredCasesCountry = countryData.NewRecovered;
    this.totalDeathsCasesCountry = countryData.TotalDeaths;
    this.newDeathsCasesCountry = countryData.NewDeaths;
    this.totalActiveCasesCountry = this.totalConfirmedCasesCountry - (this.totalRecoveredCasesCountry + this.totalDeathsCasesCountry);
    this.newActiveCasesCountry = this.newConfirmedCasesCountry - (this.newRecoveredCasesCountry + this.newDeathsCasesCountry);
 }
}
