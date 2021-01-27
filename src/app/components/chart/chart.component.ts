import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {

  @Input() country: string;
  @Input() dataCases: any[];
  @Input() dataMonths: any[];
  @Input() dataCasesMonth: any[];

  dataset: any[] = [];
  newArray2: any[] = [];
  heightChart: number = 30;
  widhtChart: number = 100;

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [

        {
          id: 'y-axis-1',
          position: 'left',
          gridLines: {
            color: 'rgba(188,95,4, 0.5)',
          },
          ticks: {
            fontColor: 'darken(#a0aca5, 80%)',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'rgba(188,95,4, 0.5)',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(188,95,4,0.2)',
      borderColor: 'rgba(188,95,4,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(188,95,4,1)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(188,95,4,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(188,95,4,1)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';


  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  screenHeight: number;
  screenWidth: number;

  constructor() { }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;
        if(this.screenWidth > 500)
        {
          this.widhtChart = 100;
          this.heightChart = 30;
          console.log('+');
        }
        else{
          this.widhtChart = 100;
          this.heightChart = 60;
          console.log('-');
        }
  }

  ngOnInit(): void {
    //console.log(this.dataCases, this.dataMonths);

  }

  ngOnChanges(changes: SimpleChanges): void {

    this.getScreenSize();

    this.dataset = [
      {data: this.dataCasesMonth, label: `Número de infectados en ${this.country}` }
    ]
  }

}
