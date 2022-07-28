import { Component, OnInit } from '@angular/core';
import { ApiService } from './api/api.service';
import { OpenCloseResponseI } from './model/response.interface';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'brainbase';
  openCloseResponse = {
    BTC: { name: 'BITCOIN', symbol: 'BTC', close: '', open: '', diff: 0, color: ''},
    ETH: { name: 'ETHEREUM', symbol: 'ETH', close: '', open: '', diff: 0, color: ''},
    LTC: { name: 'LITECOIN', symbol: 'LTC', close: '', open: '', diff: 0, color: ''},
    DOT: { name: 'OLKADOT', symbol: 'DOT', close: '', open: '', diff: 0, color: ''},
    DOGE: { name: 'DOGECOIN', symbol: 'DOGE', close: '', open: '', diff: 0, color: ''}
  }; 
  state = {
    currency: 'USD',
    date: new Date().toJSON().slice(0,10).replace(/-/g,'-')
  }

  selectedCurrency = '';
    onSelectedCurrency(value:string) {
      this.state.currency =value
      this.callIP()
    }  

  constructor(private apiService: ApiService) {}
 
  ngOnInit() {
    this.callIP()
    this.getDate()

  }


    getDate () {

        // YEAR

        let year_satart = (new Date).getFullYear()-1;
        let year_end = (new Date).getFullYear(); // current year
        let year_selected = year_end;

        let optionYear = '';

        for (let i = year_satart; i <= year_end; i++) {
            let yearSelected = (i === year_selected ? ' selected' : '');
            optionYear += '<option value="' + i + '"' + yearSelected + '>' + i + '</option>';
        }
        const year = document.getElementById("year")
        if(year){
          year.innerHTML = optionYear;
        }

        // MONTH

        let month_satart = (new Date).getMonth()-1;
        let month_end = (new Date).getMonth(); // current year
        let month_selected = month_end;
  
        let optionMonth = '';
  
        for (let i = month_satart; i <= month_end; i++) {
            let monthSelected = (i === month_selected ? ' selected' : '');
            optionMonth += '<option value="' + i + '"' + monthSelected + '>' + i + '</option>';
        }
        const month = document.getElementById("month")
        if(month){
          month.innerHTML = optionMonth;
        }
        // Day

        let day_satart = 1;
        let day_end = 31; // current year
        let day_selected = (new Date).getDay();
  
        let optionDay = '';
  
        for (let i = day_satart; i <= day_end; i++) {
            let daySelected = (i === day_selected ? ' selected' : '');
            optionDay += '<option value="' + i + '"' + daySelected + '>' + i + '</option>';
        }
        const day = document.getElementById("day")
        if(day){
          day.innerHTML = optionDay;
        }
    }
    
  
  avoid429() {
  const selecto = document.getElementById("currency") as HTMLSelectElement
  selecto.disabled = true;
  setTimeout(()=>{
    selecto.disabled = false;
  }, 25000)
}

  getDiff(a: number, b: number): number {
    var decreaseValue = b - a;
    return (decreaseValue / b) * 100;
}

  callIP() {
    const { currency, date } = this.state
   
    this.apiService.getOpenCloseBTC(currency, date).subscribe(BTC =>{
      this.openCloseResponse.BTC.open = BTC.open;
      this.openCloseResponse.BTC.close = BTC.close;
      this.openCloseResponse.BTC.diff = parseFloat((this.getDiff(parseFloat(BTC.open),parseFloat(BTC.close))).toFixed(2));
      this.openCloseResponse.BTC.color = this.openCloseResponse.BTC.diff > 0 ? "green" : "red"
    });
    this.apiService.getOpenCloseETH(currency, date).subscribe(ETH =>{
      this.openCloseResponse.ETH.open = ETH.open;
      this.openCloseResponse.ETH.close = ETH.close;
      this.openCloseResponse.ETH.diff = parseFloat((this.getDiff(parseFloat(ETH.open),parseFloat(ETH.close))).toFixed(2));
      this.openCloseResponse.ETH.color = this.openCloseResponse.ETH.diff > 0 ? "green" : "red"
    }); 
    this.apiService.getOpenCloseLTC(currency, date).subscribe((LTC)=>{
      this.openCloseResponse.LTC.open = LTC.open;
      this.openCloseResponse.LTC.close = LTC.close;
      this.openCloseResponse.LTC.diff = parseFloat((this.getDiff(parseFloat(LTC.open),parseFloat(LTC.close))).toFixed(2));
      this.openCloseResponse.LTC.color = this.openCloseResponse.LTC.diff > 0 ? "green" : "red"
    });
    this.apiService.getOpenCloseDOT(currency, date).subscribe((DOT)=>{
      this.openCloseResponse.DOT.open = DOT.open;
      this.openCloseResponse.DOT.close = DOT.close;
      this.openCloseResponse.DOT.diff = parseFloat((this.getDiff(parseFloat(DOT.open),parseFloat(DOT.close))).toFixed(2));
      this.openCloseResponse.DOT.color = this.openCloseResponse.DOT.diff > 0 ? "green" : "red"
    });
    this.apiService.getOpenCloseDOGE(currency, date).subscribe((DOGE)=>{
      this.openCloseResponse.DOGE.open = DOGE.open;
      this.openCloseResponse.DOGE.close = DOGE.close;
      this.openCloseResponse.DOGE.diff = parseFloat((this.getDiff(parseFloat(DOGE.open),parseFloat(DOGE.close))).toFixed(2));
      this.openCloseResponse.DOGE.color = this.openCloseResponse.DOGE.diff > 0 ? "green" : "red"
    });
  }
  


}
