import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { bookingData } from '../home/model/bookingData';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  // @Input() allBookingData: Array<bookingData> = [];
  @Input() bookingData: Array<bookingData> = [];
  @Output() searchEvent = new EventEmitter<any>();
  allbookingDataCopy: Array<bookingData> = [];
  _allBookingData: Array<bookingData> = [];

  @Input()
  set allBookingData(set: Array<bookingData>) {
    this._allBookingData = set;
    if (!this.allbookingDataCopy.length) {
      this.allbookingDataCopy = structuredClone(set);
    }
  }

  get allBookingData(): any { 
    console.log(this._allBookingData);
    return this._allBookingData; 
  }

  ngOnInit() {
    // this.allbookingDataCopy = structuredClone(this.allBookingData);
  }

  onInput(e: any): void {
    const val = e?.target?.value || e?.value || "";
    if (val && this.allbookingDataCopy.length) {
      this.allBookingData = this.allbookingDataCopy.filter((bookingData: bookingData) => {
        return bookingData.firstName.toLowerCase().includes(val.toLowerCase()) || bookingData.lastName.toLowerCase().includes(val.toLowerCase()) || bookingData.country.toLowerCase().includes(val.toLowerCase())
      || bookingData.bookingDetails.time.toLowerCase().includes(val.toLowerCase()) || bookingData.bookingDetails.serviceName.toLowerCase().includes(val.toLowerCase()) || bookingData.bookingDetails.price.toLowerCase().includes(val.toLowerCase());
      });
    } else {
      this.allBookingData = this.allbookingDataCopy;
    }
    this.searchEvent.emit({ allBookingData: this.allBookingData });
  }

  searchClicked(e: any): void {
    const element = document?.getElementById('searchBox');
    this.onInput(element);
  }
}
