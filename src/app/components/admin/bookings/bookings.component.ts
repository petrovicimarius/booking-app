import {
  Component,
  OnInit,
  HostListener,
  Input,
  OnDestroy,
  ViewChild,
  ElementRef
} from "@angular/core";
import { Booking } from "../../../components/admin/bookings/booking";
import { ApiConnectionService } from "../../../connection-services/api-connection/api-connection.service";

import { MatSort, MatTableDataSource } from "@angular/material";

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

  constructor(private dataService: ApiConnectionService) {}

  displayedColumns: string[] = ["name", "email", "phone", "time"];
  dataSource = new MatTableDataSource(this.bookingsList);

  @ViewChild(MatSort)
  sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.componentInput = "";
    this.getBookings();
  }

  ngAfterViewInit() {
    // this.getBookings();
  }

  getBookings(): void {
    this.dataService.getCompanyBookings().subscribe((res: any) => {
      this.bookingsList = res.bookings;
      for (let i = 0; i < res.bookings.length; i++) {
        this.nameArray.push(res.bookings[i].first_name);
        this.emailArray.push(res.bookings[i].email);
      }
      console.log("res", res.bookings);
      console.log("nameArray", this.nameArray);
      console.log("emailArray", this.emailArray);
    });
  }

  toggleSort(item): void {
    if (item === "name") {
      if (!this.sortEnabled) {
        this.sortBy = "last_name";
        this.sortEnabled = true;
      } else {
        this.sortBy = "first_name";
        this.sortEnabled = false;
      }
    } else if (item === "email") {
      this.sortBy = "email";
    } else if (item === "phone") {
      this.sortBy = "phone";
    } else if (item === "time") {
      this.sortBy = "time";
    }
  }

  toggleFilter(item): void {
    console.log("filterBy", item);
    if (item === "first_name") {
      this.filterBy = "first_name";
      this.componentInput = this.a;
    } else if (item === "last_name") {
      this.filterBy = "last_name";
      this.componentInput = this.b;
    } else if (item === "email") {
      this.filterBy = "email";
      this.componentInput = this.c;
    } else if (item === "phone") {
      this.filterBy = "phone";
      this.componentInput = this.d;
    } else if (item === "time") {
      this.filterBy = "time";
      this.componentInput = this.e;
    }
  }
  changeFilter(): void {
    if (this.show == true) {
      this.show = false;
      this.hide = true;
      this.getBookings();
    } else {
      this.show = true;
      this.hide = false;
      this.getBookings();
    }
  }
}
