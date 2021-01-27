import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchCountryService {

  constructor() { }

  getCountries(country: string, countries: string[]){

    if(country.length < 2) return ['write more'];

     return countries.filter(countri => countri.toLocaleLowerCase().includes(country));
  }

}
