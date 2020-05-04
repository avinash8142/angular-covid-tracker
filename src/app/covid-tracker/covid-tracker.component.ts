import { Component, OnInit } from '@angular/core';
import { CovidTrackerService } from '../covid-tracker.service';
import { ListOfCovids } from '../model/ListOfCovids';
import {Chart} from 'chart.js';
import { Label } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { __spreadArrays } from 'tslib';
import { CovidSummary } from '../model/CovidSummary';

@Component({
  selector: 'app-covid-tracker',
  templateUrl: './covid-tracker.component.html',
  styleUrls: ['./covid-tracker.component.css']
})
export class CovidTrackerComponent implements OnInit {

  public rowData:any[];
    public columnDefs:any[];

    confirmed:number;
    active:number;
    recover:number;
    fatel:number;

    // barChartData = {};
  barChartLabelsState = [];
  barChartLabelStateCode = [];
  barChartDataConf = [];
  barChartDataCured = [];
  barchartDataFatal= [];
  // barChartType = 'bar';
  // barChartLegend = true;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = ['q'];
  public pieChartData: number[] = [100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgb(0,0,128)','rgb(128,0,0)','rgb(60,179,113)',
    'rgb(255,0,0)'
    ],
    },
  ];

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
  ];
 


  constructor(private covidTrackerService: CovidTrackerService) { }
listOfCovids: ListOfCovids;
listOfSortedCovids:ListOfCovids;
  ngOnInit(): void {

    this.covidTrackerService.getCovidSummary().subscribe(summ=>{
this.confirmed=summ.totalCorfirmedCase;
this.active=summ.totalActiveCase;
this.recover=summ.totalRecoveredCase;
this.fatel=summ.totalFatalCase;
console.log("summary ",summ.totalCorfirmedCase);
    })



    this.covidTrackerService.getCovidDetails().subscribe(data=>{
console.log(data);
this.listOfCovids=data;
console.log("done");
console.log(this.listOfCovids.covids[0].state);



this.columnDefs = [
  {headerName: "State/UT", field: "state" ,filter: true,sortable:true},
  {headerName: "Confirmed", field: "confirmedCase",sortable:true},
  {headerName: "Recovered", field: "curedCase",sortable:true},
  {headerName: "Deceased", field: "death",sortable:true}
];
this.rowData = this.listOfCovids.covids;
this.listOfSortedCovids=this.listOfCovids;

// this.listOfCovids.covids.forEach((item) => this.barChartLabelsState.push(item.state));
// this.listOfCovids.covids.forEach((item) => this.barChartDataConf.push(item.confirmedCase ));
// this.listOfCovids.covids.forEach((item) => this.barChartDataCured.push(item.curedCase ));

this.listOfSortedCovids.covids.sort((a,b):number=>{
if(a.confirmedCase>b.confirmedCase) return -1;
if(a.confirmedCase<b.confirmedCase) return 1;
return 0;
});
// this.listOfSortedCovids.covids.forEach(i=>{
//   console.log(i.state+" "+i.confirmedCase);
// });
let i:number=0;
while(i<6)
{
  this.barChartLabelsState.push(this.listOfSortedCovids.covids[i].state);
  this.barChartDataConf.push(this.listOfSortedCovids.covids[i].confirmedCase);
  this.barChartDataCured.push(this.listOfSortedCovids.covids[i].curedCase);
  this.barchartDataFatal.push(this.listOfSortedCovids.covids[i].death);
  this.barChartLabelStateCode.push(this.listOfSortedCovids.covids[i].stateCode);
  i++;
}
// console.log('cured',this.barChartDataCured);
this.barChartLabels=this.barChartLabelStateCode;
this.pieChartLabels=this.barChartLabelStateCode;

this.barChartData=[{
  data:this.barChartDataConf,label:'Confirmed'},
  {data:this.barChartDataCured,label:'Cured'
}
// ,
// {data:this.barchartDataFatal,label:'Fatal'
// }
];
this.pieChartData=this.barChartDataConf;

    })
  }

}
