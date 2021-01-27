import { group } from '@angular/animations';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StatisticInfoService } from '../../services/statistic-info.service';

@Component({
  selector: 'app-main-statistics',
  templateUrl: './main-statistics.component.html',
  styleUrls: ['./main-statistics.component.scss']
})
export class MainStatisticsComponent implements OnInit, OnChanges {

  @Input() country: string;
  sumDeaths: number;
  sumConfirmed: number;
  lastConfirmed: number; 
  lastDeaths: number;

  constructor(private mainStati: StatisticInfoService) {
    
  }

  ngOnInit(): void {
    
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void>{
    const {sumDeaths, sumConfirmed, 
      lastConfirmed, lastDeaths } =  await this.mainStati.getMainStatistics(this.country);
      this.sumDeaths = sumDeaths;
      this.sumConfirmed = sumConfirmed;
      this.lastConfirmed = lastConfirmed;
      this.lastDeaths = lastDeaths; 
      

  }

  getPrettyNumber(num: number): string
  {
    let newNumber: string = '';
    let aux;
    for(let i = 0; i < num.toString().length; i++)
    {
      if(i = 0)
      {
        aux = num[i].toString();
        newNumber = newNumber+aux;
      }
      else if( i % 3 == 0)
      {
        newNumber = newNumber+',';
      }
      else{
        aux = num[i].toString();
        newNumber = newNumber + aux;
      }
    }

    return newNumber;
  }



}
