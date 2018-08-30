// tslint:disable-next-line:quotemark
import { Component, OnInit } from "@angular/core";
import { Service } from "../../admin/services/service";
import { ApiConnectionService } from "../../../connection-services/api-connection/api-connection.service";
import {
  Router,
  Route,
  RoutesRecognized,
  ActivatedRoute
} from "@angular/router";
import { Office } from "../../admin/offices/office";
import { FlatpickrModule } from "angularx-flatpickr";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Booking } from "../../admin/bookings/booking";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-public-services",
  templateUrl: "./public-services.component.html",
  styleUrls: ["./public-services.component.css"]
})
@NgModule({
  imports: [FormsModule, FlatpickrModule.forRoot()]
})
export class PublicServicesComponent implements OnInit {
  public id;
  public service_id;
  public servicesList: Service[] = [];
  public office: Office = new Office();
  public booking: Booking = new Booking();
  public service: Service = new Service();

  public bookEnabled = false;
  public sendEnabled = false;

  public now = new Date();
  public today;

  constructor(
    private dataService: ApiConnectionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    console.log("res", this.id);
    this.today = formatDate(this.now, "yyyy-MM-dd", "en-US", "+0530");
    console.log("today", this.today);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.getServices();
    this.getOffice();
  }

  getOffice(): void {
    this.dataService.getOffice(this.id).subscribe((res: any) => {
      this.office = res.office;
      console.log("res office", this.office);
    });
  }

  getServices(): void {
    this.dataService.getServices(this.id).subscribe((res: any) => {
      this.servicesList = res.services;
      console.log("res services", this.servicesList);
    });
  }

  addBooking(item): void {
    this.booking.office = this.id;
    this.booking.service = this.service_id;
    this.booking.company = localStorage.getItem("public_company_id");
    console.log("booking", this.booking);
    this.dataService.addBooking(this.booking).subscribe((res: any) => {
      console.log("res booking", res);
    });
    this.sendBooking();
  }

  toggleBook(item): void {
    // console.log('item', item);
    this.service = item;
    this.service_id = item._id;

    // this.booking.office = this.id;
    // this.booking.service = this.service_id;
    // this.booking.company = localStorage.getItem('public_company_id');
    // console.log('service', this.service_id);

    if (this.bookEnabled) {
      this.bookEnabled = false;
    } else {
      this.bookEnabled = true;
    }
  }
  toggleUndo(): void {
    this.bookEnabled = false;
    this.sendEnabled = false;
    // window.location.reload();
  }
  sendBooking(): void {
    this.bookEnabled = false;
    this.sendEnabled = true;
  }
}
