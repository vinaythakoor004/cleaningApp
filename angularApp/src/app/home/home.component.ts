import { Component, inject, OnInit } from '@angular/core';
import { SearchComponent } from "../search/search.component";
import { CommonModule } from '@angular/common';
import { HomeService } from './service/home.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { bookingData } from './model/bookingData';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PopupService } from '../common/service/popup/popup.service';
import { AlertService } from '../common/service/alert/alert.service';
import { CommonService } from '../common/service/common/common.service';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
// import { ScrollingModule } from '@angular/cdk/scrolling';
import { WebsocketService } from './service/websocket.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, SearchComponent, MatButtonModule, BubbleChartComponent ], //ScrollingModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  allBookingData: Array<bookingData> = [];
  bookingData: Array<bookingData> = [];
  pageSize: Array<number> = [];
  currentPage: number = 1;
  readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  subscriptions: Subscription | undefined;
  loggedInUser: any = {};
  public isLoading: boolean = true;
  public errorMessage: string | null = null;
  constructor(private homeService: HomeService, private popupService: PopupService,
    private alertService: AlertService,
    private ws: WebsocketService,
    private commonService: CommonService) { }

  ngOnInit(): void {
    this.getServiceData();
    this.loggedInUser = this.commonService.loggedInUser;
    // this.subscriptions = this.homeService.bookingFormSubmitSubject.subscribe((data: Array<bookingData>) => {
    //   console.log(data);
    //   if (data.length > 0) {
    //     this.allBookingData = data;
    //     this.getPageSize();
    //     this.getPageData(1);
    //   }
    // })
    this.ws.listenToBooking().subscribe(booking => {
    alert('📢 New booking received:\n' + JSON.stringify(booking));
    // or push to a bookings array if you're displaying a list
  });
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  getServiceData(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.homeService.getServiceData().subscribe({
      next: (data) => {
        this.isLoading = false;
        this.allBookingData = data;
        this.getPageSize();
        this.getPageData(1);
      },
      error: (err) => {
        console.log(err)
        this.allBookingData = [];
        this.getPageSize();
        this.getPageData(1);
        this.errorMessage = 'Failed to load booking data. Please try again later.';
        this.isLoading = false;
      }
    }
    )
  }

  getPageSize(): Array<number> {
    let limit = Math.ceil(this.allBookingData.length / 10);
    return this.pageSize = [...Array(limit)].map((a, i) => i + 1)
  }

  getPageData(page: number, e?: any, pageNoElement?: any): void {
    this.currentPage = page;
    if (e) {
      e.preventDefault();
    }
    let start = (page - 1) * 10;
    let end = start + 10;
    const newArr = this.allBookingData.slice(start, end);
    this.bookingData = structuredClone(newArr);
  }

  getSearch(e: any): void {
    this.allBookingData = e.allBookingData;
    this.getPageData(1);
    this.getPageSize();
  }

  getPageClass(page: number): string {
    return page === 1 ? 'active' : '';
  }

  identify(index: any, item: any) {
    return item.bookingId;
  }

  openDetailsDialog(item: bookingData): void {
    const data = {
        bookingData: item,
        isBookingDetails: true,
    }
    this.popupService.openDialog(data, '40rem', 'custom-dialog-container');
  }

  deleteRow(item: bookingData): void {
    const data = {
      isDelete: true,
      isConfirmDialog: true,
      selectdItem: item
    }
    this.popupService.openDialog(data, '30rem', 'custom-dialog-container', () => {
      this.allBookingData = this.allBookingData.filter((data) => data.bookingId !== item.bookingId);
      this.currentPage = this.bookingData.length == 1 && this.bookingData[0].bookingId == item.bookingId && this.currentPage != 1 ? this.currentPage - 1 : this.currentPage;
      this.getPageSize();
      this.getPageData(this.currentPage);
      this.alertService.openSnackBar('Row: ' + item.bookingId + ' deleted successfully');
    });
   }

   editRow(item: bookingData): void {
    const data = {
      isEdit: true,
      isConfirmDialog: true,
      selectdItem: item
    }
    this.popupService.openDialog(data, '30rem', 'custom-dialog-container', () => {
      this.homeService.isEdit = true;
      this.homeService.editItem = item;
      const url = '/services/book-service/appointment';
      const params = {
          queryParams: {
              name: item.bookingDetails.serviceName
          }
      };
      this.router.navigate([url], params);
    });
   }
}
