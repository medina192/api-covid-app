import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CountriesInfoService } from '../../services/countries-info.service';

@Component({
  selector: 'app-main-chart',
  templateUrl: './main-chart.component.html',
  styleUrls: ['./main-chart.component.scss']
})
export class MainChartComponent implements OnInit, OnChanges {

  @Input() country: string;
  //countriesInfo:any = new CountriesInfoService();
  dataCases: any[] = [];
  dataMonths: any[] = [];
  showChart: boolean = false;
  dataCasesMonth: any[] = [];
  dayOne: string;

  constructor(private countryService: CountriesInfoService) {
  
   }

  ngOnInit(): void {

   

  }

  
  async ngOnChanges(changes: SimpleChanges) {
    
    const dataForChart = await this.countryService.getDataChart(this.country);
    this.dataCases = dataForChart[0];
    this.dataMonths = dataForChart[1];
    this.dataCasesMonth = dataForChart[2];
    this.dayOne = this.getPrettyDate(dataForChart[3]); 

    this.showChart = true;
  }

  getPrettyDate(date: string): string{
    
    let month = date.substring(5,7);

    let newMonth = '';
    switch (month) {
      case '01':
        newMonth = 'Enero';
        break;
      case '02':
        newMonth = 'Febrero';
        break;
      case '03':
        newMonth = 'Marzo';
        break;  
      case '04':
        newMonth = 'Abril';
        break;
      case '05':
        newMonth = 'Mayo';
        break;
      case '06':
        newMonth = 'Junio';
        break;   
      case '07':
        newMonth = 'Julio';
        break;
      case '08':
        newMonth = 'Agosto';
        break;
      case '09':
        newMonth = 'Septiembre';
        break;  
      case '10':
        newMonth = 'Octubre';
        break;
      case '11':
        newMonth = 'Noviembre';
        break;
      case '12':
        newMonth = 'Diciembre';
        break;   
    
      default:
        break;
    }

    let newDate = date.substring(8,10)+' de '+newMonth+' del '+date.substring(0,4);

    return newDate;
  }

}
