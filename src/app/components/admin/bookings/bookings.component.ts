import { Component, OnInit, ViewChild } from "@angular/core";
import { ApiConnectionService, Booking } from "@app/api-connection";
import Api from "@app/routes";

@Component({
  selector: "app-bookings",
  templateUrl: "./bookings.component.html",
  styleUrls: ["./bookings.component.css"]
})
export class BookingsComponent implements OnInit {
  @ViewChild("componentInput")
  componentInput: any;

  public bookings: Booking = new Booking();
  public bookingsList;
  public sortBy = "first_name";
  public filterBy = "first_name";
  public nameArray = [];
  public emailArray = [];
  a;
  b;
  c;
  d;
  e;
  public sortEnabled = false;
  public show = true;
  public hide = true;

  constructor(private _booking: ApiConnectionService<Booking>) {}

  ngOnInit() {
    this.componentInput = "";
    this.getBookings();
  }

  ngAfterViewInit() {}

  getBookings(): void {
    this._booking.get(`${Api.base}${Api.booking}`).subscribe(
      (res: any) => {
        this.bookingsList = res.bookings;
        for (let i = 0; i < res.bookings.length; i++) {
          this.nameArray.push(res.bookings[i].first_name);
          this.emailArray.push(res.bookings[i].email);
        }
      },
      err => console.log("Err ", err)
    );
  }

  toggleSort(item) {
    switch (item) {
      case "name":
        if (!this.sortEnabled) {
          this.sortBy = "last_name";
          this.sortEnabled = true;
        } else {
          this.sortBy = "first_name";
          this.sortEnabled = false;
        }
        break;
      case "email":
        this.sortBy = "email";
        break;
      case "phone":
        this.sortBy = "phone";
        break;
      case "time":
        this.sortBy = "time";
        break;
      default:
        break;
    }
  }

  toggleFilter(item) {
    switch (item) {
      case "first_name":
        this.filterBy = "first_name";
        this.componentInput = this.a;
        break;
      case "last_name":
        this.filterBy = "last_name";
        this.componentInput = this.b;
        break;
      case "email":
        this.filterBy = "email";
        this.componentInput = this.c;
        break;
      case "phone":
        this.filterBy = "phone";
        this.componentInput = this.d;
        break;
      case "time":
        this.filterBy = "time";
        this.componentInput = this.e;
        break;
      default:
        break;
    }
  }

  changeFilter() {
    this.show = !this.show;
  }
}
