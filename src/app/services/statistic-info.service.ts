import { HttpClient } from '@angular/common/http';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatisticInfoService {

  constructor(private http: HttpClient) { }

  getSumArray(anyArray: number[]):number{

    let aux = 0;
    for(let i = 0; i < anyArray.length; i++)
    {
      aux = aux + anyArray[i];
    }

    return aux;

  }

  async getMainStatistics(country: string){

    const today = new Date();

    let year = (today.getFullYear()).toString();
    let month = (today.getMonth()+1).toString();
    if(month.toString().length === 1) month = '0'+ month.toString();
    let day = (today.getDate()).toString();
    if(day.toString().length === 1) day = '0'+ day.toString();
    const currentdate = year+'-'+month+'-'+day;
    
    // yesterday date
    const today1 = new Date()
    const yesterday = new Date(today1)

    yesterday.setDate(yesterday.getDate() - 1)

    //let dayToday = today.toDateString().substring(0,4);
    let dayPast = yesterday.toDateString().substring(8,10);

    if(dayPast.toString().length === 1) dayPast = '0'+ dayPast.toString();
    //let yearToday = today.toDateString().substring(11,15);
    let yearPast = yesterday.toDateString().substring(11,15);

    let monthPast = (yesterday.getMonth()+1).toString();
    if(monthPast.toString().length === 1) monthPast = '0'+ monthPast.toString();
    const pastDate = yearPast+'-'+monthPast+'-'+dayPast;



    //before yesterday date
    const beforeYesterday = new Date(today1)

    beforeYesterday.setDate(beforeYesterday.getDate() - 2)

    //let dayToday = today.toDateString().substring(0,4);
    let dayBPast = beforeYesterday.toDateString().substring(8,10);

    if(dayBPast.toString().length === 1) dayBPast = '0'+ dayBPast.toString();
    //let yearToday = today.toDateString().substring(11,15);
    let yearBPast = beforeYesterday.toDateString().substring(11,15);

    let monthBPast = (beforeYesterday.getMonth()+1).toString();
    if(monthBPast.toString().length === 1) monthBPast = '0'+ monthBPast.toString();
    const pastBYesterday = yearBPast+'-'+monthBPast+'-'+dayBPast;



    const [ dataYesterday, dataBeforeYesterday ] = await Promise.all([
      this.http.get(`https://api.covid19api.com/live/country/${country}/status/confirmed/date/${pastDate}T13:13:30Z`).toPromise(),
      this.http.get(`https://api.covid19api.com/live/country/${country}/status/confirmed/date/${pastBYesterday}T13:13:30Z`).toPromise()
    ]);
    
    let arrayBeforeDeaths: number[] = [];
    let arrayBeforeConfirmed: number[] = [];
    let arrayAfterDeaths: number[] = [];
    let arrayAfterConfirmed: number[] = [];

    let auxBefore: number = 0;
    let auxAfter: number = 0;


   
    for(let i = 0; i < Object.keys(dataBeforeYesterday).length; i++)
    {
      if(dataBeforeYesterday[i].Date.substring(0,10) == pastDate)
      {
        arrayBeforeDeaths[auxBefore] = dataBeforeYesterday[i].Deaths;
        arrayBeforeConfirmed[auxBefore] = dataBeforeYesterday[i].Confirmed;
        auxBefore++;
      }
      if(dataBeforeYesterday[i].Date.substring(0,10) == currentdate)
      {
        arrayAfterDeaths[auxAfter] = dataBeforeYesterday[i].Deaths;
        arrayAfterConfirmed[auxAfter] = dataBeforeYesterday[i].Confirmed;
        auxAfter++;
      }
    }



    let sumDeaths = this.getSumArray(arrayAfterDeaths);
    let sumConfirmed = this.getSumArray(arrayAfterConfirmed);
    let lastDeaths = sumDeaths - this.getSumArray(arrayBeforeDeaths);
    let lastConfirmed = sumConfirmed - this.getSumArray(arrayBeforeConfirmed);

    
    return {
      sumDeaths,
      sumConfirmed,
      lastDeaths,
      lastConfirmed
    }
    

  }

}
