import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { SearchCountryService } from '../../services/search-country.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() countriesNames: string[];
  @Input() numeros: number;

  @Output() countrySelected = new EventEmitter <string>();

  countries: string[] = [];
  selectedCountry: string = '';
  showScroll: boolean = false;
  showSearcherOptions: boolean = false;
  searcherOptionsContent: string[] = [];
  count: number = 0;

  constructor(private searchCountry: SearchCountryService) {
                  /*
                  let crm = window.indexedDB.open('crm', 1);

                  crm.onerror = () =>{
                    console.log('there was an error');
                  }

                  crm.onsuccess = () => {
                    console.log('database was created with success');
                  }

                  crm.onupgradeneeded = (e:any) => {
                    console.log('this code just runs one time');
                    const db = e.target.result;
                    console.log(db);
                 
                    const objectStore = db.createObjectStore('crm',{
                      keypath: 'crmm',
                      autoIncrement: true
                    });

                    objectStore.createIndex('name','name',{unique: false});
                  
                  }
                    */
                 

                /*
                sessionStorage.setItem('austria',JSON.stringify([{hi: 'hi'},{hi:'hi2'}]));


                let miPrimeraPromise = new Promise((resolve, reject) => {
                  // Llamamos a resolve(...) cuando lo que estabamos haciendo finaliza con éxito, y reject(...) cuando falla.
                  // En este ejemplo, usamos setTimeout(...) para simular código asíncrono.
                  // En la vida real, probablemente uses algo como XHR o una API HTML5.
                  let retrievedData = localStorage.getItem("austria");
                  let movies2 = JSON.parse(retrievedData);
                  console.log('statistics',movies2);
                });
                
                miPrimeraPromise.then((successMessage) => {
                  // succesMessage es lo que sea que pasamos en la función resolve(...) de arriba.
                  // No tiene por qué ser un string, pero si solo es un mensaje de éxito, probablemente lo sea.
                  console.log("¡Sí! " + successMessage);
                });
                */
   }

  ngOnInit(): void {

    const countries = this.countriesNames;

    let countryes: string[] = [];
    let aux;
    for(let i=0; i<countries.length; i++)
    {
      aux= this.countriesNames[i];
      countryes[i] = aux[0].toUpperCase() + aux.slice(1);
    }
    
    this.countries = countryes;
  }

  selectCountry(countryName: String): void{
    const name = countryName.toLowerCase();
    this.selectedCountry = name;
    this.countrySelected.emit(this.selectedCountry);
  }

  sendCountry(countryWrote: string):void{
    const countriesFounded = this.searchCountry.getCountries(countryWrote, this.countries);
    if (countriesFounded[0] === 'write more'){
      this.showSearcherOptions = false;
      this.searcherOptionsContent = [];
    } 
    else if( countriesFounded.length === 0) {
      this.showScroll = false;
      this.showSearcherOptions = true;
      this.searcherOptionsContent = ['No se encontraron resultados'];
    }
    else{
      this.showScroll = false;
      this.showSearcherOptions = true;
      this.searcherOptionsContent = countriesFounded;
    }
  }

  turnShowScroll(){
    if(!this.showScroll)
    {
      this.showScroll = true;
      this.showSearcherOptions = false;
    }
    else{
      this.showScroll = false;
    }
  }

  avoidBlurFail(){
    setTimeout(() => {
      this.showSearcherOptions = false;
    }, 1000); 
  }

 

}
