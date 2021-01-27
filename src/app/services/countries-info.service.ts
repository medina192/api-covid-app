import { HttpClient } from '@angular/common/http';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesInfoService {

  main_url: string = 'https://api.covid19api.com';
  currentDate: string = '';

  constructor(private http: HttpClient) { }

   async getDataChart(country: string){

   
    const promise = await this.http.get(`${this.main_url}/dayone/country/${country}/status/confirmed`).toPromise();
    const pastDate = promise[0].Date.substring(0,10);
    let pastMonth = pastDate.substring(5,7);
    let pastYear = pastDate.substring(0,4);


    const today = new Date();

    let year = (today.getFullYear()).toString();
    let month = (today.getMonth()+1).toString();
    if(month.toString().length === 1) month = '0'+ month.toString();
    let day = (today.getDate()).toString();
    if(day.toString().length === 1) day = '0'+ day.toString();
    const currentdate = year+'-'+month+'-'+day;
      
    const promise2 = await this.http.get(`${this.main_url}/total/country/${country}/status/confirmed?from=${pastDate}T00:00:00Z&to=${currentdate}T00:00:00Z
    `).toPromise();

    let size = Object.keys(promise2).length;
    let arrayCases: number[] = [];
    let casesByDay: number[] = [];
    let currentMonth: string;
    let casesByMonth: number[] = [];
    let pastMonthAux: string;

    let sumIndexAux: number = 0;
    let sumAmountAux: number = 0;

    for(let i = 0; i< size; i++)
    {
      arrayCases[i] = promise2[i].Cases;
      if(i === 0) 
      {
        currentMonth = promise2[i].Date.substring(5,7);
        pastMonthAux =  promise2[i].Date.substring(5,7);
        continue;
      }
      else{
        casesByDay[i] = <number>arrayCases[i] - <number>arrayCases[i - 1];
        currentMonth = promise2[i].Date.substring(5,7);
        pastMonthAux =  promise2[i - 1].Date.substring(5,7);
        
        if(currentMonth === pastMonthAux)
        {
          casesByMonth[sumIndexAux] = sumAmountAux + casesByDay[i];
          sumAmountAux = casesByMonth[sumIndexAux];
        }
        else{
        
          sumIndexAux++;
          sumAmountAux = 0;
        }
      }
      
    }
    
    const arrayMonths = ['Agosto 2019',
                         'Septiembre 2019',
                         'Octubre 2019',
                         'Noviembre 2019',
                         'Diciembre 2019',
                         'Enero 2020',
                         'Febrero 2020',
                         'Marzo 2020',
                         'Abril 2020',
                         'Mayo 2020',
                         'Junio 2020',
                         'Julio 2020',
                         'Agosto 2020',
                         'Septiembre 2020',
                         'Octubre 2020',
                         'Noviembre 2020',
                         'Diciembre 2020',
                         'Enero 2021',
                         'Febrero 2021',
                         'Marzo 2021',
                         'Abril 2021',
                         'Mayo 2021',
                         'Junio 2021',
                         'Julio 2021'
                        ];
    let pastNumber = 0;

    switch(pastYear)
    {
      case '2019':
        pastNumber = Number(pastMonth)-8; 
        break;
      case '2020':
        pastNumber = Number(pastMonth) + 4;
        break;  
      case '2021':
        pastNumber = Number(pastMonth) + 16;
        break;  
      default: 
        pastNumber = 5; 
    }


    let todayNumber = 0;

    switch(year)
    {
      case '2019':
        todayNumber = Number(month)-8; 
        break;
      case '2020':
        todayNumber = Number(month) + 4;
        break;  
      case '2021':
        todayNumber = Number(month) + 16;
        break;  
      default: 
        todayNumber = 5; 
    }

    const labelsArray = arrayMonths.slice(pastNumber, todayNumber + 1);

    
    return [casesByDay,labelsArray, casesByMonth, pastDate];
  } 
  
}
