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
    BTC: { name: 'BITCOIN', symbol: 'BTC', close: '', open: '', diff: 0, color: '', error: ''},
    ETH: { name: 'ETHEREUM', symbol: 'ETH', close: '', open: '', diff: 0, color: '', error: ''},
    LTC: { name: 'LITECOIN', symbol: 'LTC', close: '', open: '', diff: 0, color: '', error: ''},
    DOT: { name: 'OLKADOT', symbol: 'DOT', close: '', open: '', diff: 0, color: '', error: ''},
    DOGE: { name: 'DOGECOIN', symbol: 'DOGE', close: '', open: '', diff: 0, color: '', error: ''}
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
   
    /****************** BTC *********************/
    this.apiService.getOpenCloseBTC(currency, date).subscribe(BTC =>{
      const cryptoBTC = this.openCloseResponse.BTC
      cryptoBTC.open = BTC.open;
      cryptoBTC.close = BTC.close;
      cryptoBTC.diff = parseFloat((this.getDiff(parseFloat(BTC.open),parseFloat(BTC.close))).toFixed(2));
      cryptoBTC.color = cryptoBTC.diff > 0 ? "green" : "red"
      cryptoBTC.error = ""
    },
    () => {   // Error verification
      console.log('error caught in component')
      const cryptoBTC = this.openCloseResponse.BTC
      cryptoBTC.open = "no access";
      cryptoBTC.close = "no access";
      cryptoBTC.diff = 0;
      cryptoBTC.error = "access_error";
    });

    /****************** ETH *********************/
    this.apiService.getOpenCloseETH(currency, date).subscribe(ETH =>{
      const cryptoETH = this.openCloseResponse.ETH
      cryptoETH.open = ETH.open;
      cryptoETH.close = ETH.close;
      cryptoETH.diff = parseFloat((this.getDiff(parseFloat(ETH.open),parseFloat(ETH.close))).toFixed(2));
      cryptoETH.color = this.openCloseResponse.ETH.diff > 0 ? "green" : "red"
      cryptoETH.error = ""
    },
    () => {   // Error verification
      console.log('error caught in component')
      const cryptoETH = this.openCloseResponse.ETH
      cryptoETH.open = "no access";
      cryptoETH.close = "no access";
      cryptoETH.diff = 0;
      cryptoETH.error = "access_error";
    });

    /****************** LTC *********************/
    this.apiService.getOpenCloseLTC(currency, date).subscribe((LTC)=>{
      const cryptoLTC = this.openCloseResponse.LTC
      cryptoLTC.open = LTC.open;
      cryptoLTC.close = LTC.close;
      cryptoLTC.diff = parseFloat((this.getDiff(parseFloat(LTC.open),parseFloat(LTC.close))).toFixed(2));
      cryptoLTC.color = cryptoLTC.diff > 0 ? "green" : "red"
      cryptoLTC.error = ""
    },
    () => {   // Error verification
      console.log('error caught in component')
      const cryptoLTC = this.openCloseResponse.LTC
      cryptoLTC.open = "no access";
      cryptoLTC.close = "no access";
      cryptoLTC.diff = 0;
      cryptoLTC.error = "access_error";
    });

    /****************** DOT *********************/
    this.apiService.getOpenCloseDOT(currency, date).subscribe((DOT)=>{
      const cryptoDOT = this.openCloseResponse.DOT
      cryptoDOT.open = DOT.open;
      cryptoDOT.close = DOT.close;
      cryptoDOT.diff = parseFloat((this.getDiff(parseFloat(DOT.open),parseFloat(DOT.close))).toFixed(2));
      cryptoDOT.color = this.openCloseResponse.DOT.diff > 0 ? "green" : "red"
      cryptoDOT.error = ""
    },
    () => {   // Error verification
      console.log('error caught in component')
      const cryptoDOT = this.openCloseResponse.DOT
      cryptoDOT.open = "no access";
      cryptoDOT.close = "no access";
      cryptoDOT.diff = 0;
      cryptoDOT.color = ""
      cryptoDOT.error = "access_error";
    });

    /****************** DOGE *********************/
    this.apiService.getOpenCloseDOGE(currency, date).subscribe((DOGE)=>{
      const cryptoDOGE = this.openCloseResponse.DOGE
      cryptoDOGE.open = DOGE.open;
      cryptoDOGE.close = DOGE.close;
      cryptoDOGE.diff = parseFloat((this.getDiff(parseFloat(DOGE.open),parseFloat(DOGE.close))).toFixed(2));
      cryptoDOGE.color = this.openCloseResponse.DOGE.diff > 0 ? "green" : "red"
      cryptoDOGE.error = ""
    },
    () => {   // Error verification
      console.log('error caught in component')
      const cryptoDOTGE = this.openCloseResponse.DOGE
      cryptoDOGE.open = "no access";
      cryptoDOGE.close = "no access";
      cryptoDOGE.diff = 0;
      cryptoDOGE.color = ""
      cryptoDOGE.error = "access_error";
    });

    const information = document.getElementById("information")
    if(information) {
      information.style.display = 'none';
    }
    const cryptoBTC = this.openCloseResponse.BTC
    const cryptoETH = this.openCloseResponse.ETH
    const cryptoLTC = this.openCloseResponse.LTC
    const cryptoDOT = this.openCloseResponse.DOT
    const cryptoDOGE = this.openCloseResponse.DOGE

    if(cryptoBTC.error !== "" ||cryptoETH.error !== "" || cryptoLTC.error !== "" || cryptoDOT.error !== "" || cryptoDOGE.error !== "" ){
      if(information) {
        information.style.display = 'block';
      }
    }
  }
  
   


}
