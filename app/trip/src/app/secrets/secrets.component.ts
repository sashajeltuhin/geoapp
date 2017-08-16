import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';
import {GeoService} from '../geo.service';
import {MapService} from '../map/map.service';
import {ErrorService} from '../error/error.service';

@Component({
  selector: 'app-secrets',
  templateUrl: './secrets.component.html',
  styleUrls: ['./secrets.component.css']
})
export class SecretsComponent implements OnInit {
  private error;
  private showChart = false;
  private cashLimit = 0;
  private account = "";
  public lineChartData:Array<any> = [
  {data:[0,0,0,0,0,0,0,0,0,0,0,0], label: "Balance", yAxisID:"axis_balance"},
  {data:[0,0,0,0,0,0,0,0,0,0,0,0], label: "Rate", yAxisID:"axis_rate"}];
  public lineChartLabels:Array<any> = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; 
  public lineChartOptions:any = {
    responsive: true,
    scales: {
      yAxes: [{
        position: "left",
        "id": "axis_balance"
      }, {
        position: "right",
        "id": "axis_rate"
      }]
    }
  
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // purple
      backgroundColor: 'rgba(153,102,255,0.2)',
      borderColor: 'rgba(153,102,255,1)',
      pointBackgroundColor: 'rgba(153,102,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(153,102,255,1)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  constructor(private geo:GeoService, private maps:MapService, private errSvc: ErrorService, private router: Router) { }

  ngOnInit() {

  this.geo.getAccount()
       .subscribe(
         data => {
          this.account = data.account;
          this.loadLimit();
          this.loadAccountData();
         },
         error =>  {
         this.error = error;
          this.errSvc.recordError(this.error, this.router);
         });

  }

  loadLimit(){
    this.geo.getLimit()
         .subscribe(
           data => {
            this.cashLimit = data.limit;
            console.log("this.cashLimit", this.cashLimit);
           },
           error =>  {
           this.error = error;
            this.errSvc.recordError(this.error, this.router);
           });
  }

  loadAccountData(){
     this.geo.getAccountData()
         .subscribe(
           data => {
            console.log("accountdata", data);
            this.showChart = true;
            this.paintChart(data);
           },
           error =>  {
           console.log("accountdata error", error);
           this.showChart = false;
           });
  }

  paintChart(data){
    let series = 2;
    if (data && data.length > 0){
      let _lineChartData:Array<any> = new Array(series);
      let _lineChartLabels:Array<any> = new Array(data.length);
      _lineChartData[0] = {};
      _lineChartData[1] = {};
      _lineChartData[0].data = new Array(data.length);
      _lineChartData[0].yAxisID = "axis_balance";
      _lineChartData[0].label = "Balance";
      _lineChartData[1].data = new Array(data.length);
      _lineChartData[1].yAxisID = "axis_rate";
      _lineChartData[1].label = "Rate";
      
        for(var i = 0; i < data.length; i++){
            _lineChartLabels[i] = data[i].Month;
            _lineChartData[0].data[i] = data[i].Total;
            _lineChartData[1].data[i] = data[i].Rate;
        }
        this.lineChartLabels = _lineChartLabels;
        this.lineChartData = _lineChartData;
        console.log("chart data", this.lineChartData);
        console.log("labels", this.lineChartLabels);
    }
  }

}
