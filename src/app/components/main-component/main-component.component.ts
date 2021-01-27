import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss']
})
export class MainComponentComponent implements OnInit {

  data: any = {};
  countriesNames: string[];
  country: string;


  constructor(private http: HttpClient) {

    this.country = 'mexico';
    
    this.http.get(`https://api.covid19api.com/summary`)
              .subscribe( (data:any) => {
                  this.data = data;
                  this.countriesNames = data.Countries.map((country) => {
                    return country.Slug;
                  });
                  //this.countriesNames.unshift('Todo el mundo');
              });
    }

  ngOnInit(): void {
  }

  saveCountry(country: string){
    this.country = country;
  }

}
