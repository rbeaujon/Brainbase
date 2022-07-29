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
    date: new Date().toJSON().slice(0,10).replace(/-/g,'-'),
    selectedDate: {
      year: '',
      month: '',
      day: ''
    }
  }

  selectedCurrency = '';
    onSelectedCurrency(value:string) {
      this.state.currency =value
      this.callIP(0)
    }  
  selectedYear = '';
  onSelectedYear(value:string) {
    this.state.selectedDate.year = value
  }  

  constructor(private apiService: ApiService) {}
 
  ngOnInit() {
    this.callIP(0)
    this.getDate()

  }


    getDate () {

      const calendarContainer = document.getElementById("calendar-container")
      const calendar = document.getElementById("calendar")
      if(calendarContainer && calendar) {
        calendarContainer?.addEventListener('mouseover', function handleMouseOver() {
        calendar.style.display = 'block';
      });
      
      calendarContainer.addEventListener('mouseout', function handleMouseOut() {
        calendar.style.display = 'none';
      });
    }
 

        // YEAR

        let year_start = (new Date).getFullYear()-1;
        let year_end = (new Date).getFullYear(); // current year
        let year_selected = 0;

        let optionYear = '';
        optionYear = '<option>Year</option>'; // first option

        for (let i = year_start; i <= year_end; i++) {
            let yearSelected = (i === year_selected ? ' selected' : '');
            optionYear += '<option value="' + i + '"' + yearSelected + '>' + i + '</option>';
        }
        
        const year = document.getElementById("year")
        if(year){
          year.innerHTML = optionYear;
        }

        // MONTH

        let month_start = 1;
        let month_end = 12;
        let month_selected = 0;
  
        let optionMonth = '';
        optionMonth = '<option>Month</option>'; // first option
        
        for (let i = month_start; i <= month_end; i++) {
            let monthSelected = (i === month_selected ? ' selected' : '');
            optionMonth += '<option value="' + i + '"' + monthSelected + '>' + i + '</option>';
        }
        const month = document.getElementById("month")
        if(month){
          month.innerHTML = optionMonth;
        }
        // Day

        let day_start = 1;
        let day_end = 31; // current day
        let day_selected = 0;
  
        let optionDay = '';
        optionDay = '<option>Day</option>'; // first option
  
        for (let i = day_start; i <= day_end; i++) {
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

  callIP(reset: number) {
   if(reset === 1){
    const { year, month, day } = this.state.selectedDate
    year !== "" && month !=="" && day !== "" 
    ? this.state.date = year + "-" + month + "-" + day
    : this.state.date
   }
    const { currency, date } = this.state
    console.log("DATE " + this.state.date)
   
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
