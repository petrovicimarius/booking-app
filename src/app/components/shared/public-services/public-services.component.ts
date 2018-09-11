import { Component, OnInit, NgModule } from "@angular/core";
import {
  ApiConnectionService,
  Service,
  Office,
  Booking
} from "@app/api-connection";
import { ActivatedRoute } from "@angular/router";
import { FlatpickrModule } from "angularx-flatpickr";
import { FormsModule } from "@angular/forms";
import { formatDate } from "@angular/common";
import Api from "@app/routes";

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
  public starsCount: number;
  public bookEnabled = false;
  public sendEnabled = false;

  public now = new Date();
  public today;

  constructor(
    private _service: ApiConnectionService<Service>,
    private _office: ApiConnectionService<Office>,
    private _booking: ApiConnectionService<Booking>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.today = formatDate(this.now, "yyyy-MM-dd", "en-US", "+0530");
  }

  ngAfterViewInit() {
    this.getServices();
    this.getOffice();
  }

  getOffice(): void {
    this._office.get(`${Api.base}${Api.office}${"/"}${this.id}`).subscribe(
      (res: any) => {
        this.office = res.office;
      },
      err => console.log("Err ", err)
    );
  }

  getServices(): void {
    this._service.get(`${Api.base}${Api.services}${this.id}`).subscribe(
      (res: any) => {
        this.servicesList = res.services;
      },
      err => console.log("Err ", err)
    );
  }

  addBooking(): void {
    this.booking.office = this.id;
    this.booking.service = this.service_id;
    this.booking.company = localStorage.getItem("public_company_id");
    this._booking
      .post(`${Api.base}${Api.booking}`, this.booking)
      .subscribe((res: any) => {}, err => console.log("Err ", err));
    this.sendBooking();
  }

  getRating() {
    // if (this.starsCount) {
    // }
  }

  toggleBook(item): void {
    this.booking = new Booking();
    this.service = item;
    this.service_id = item._id;
    if (this.bookEnabled) {
      this.bookEnabled = false;
    } else {
      this.bookEnabled = true;
    }
  }
  toggleUndo(): void {
    this.bookEnabled = false;
    this.sendEnabled = false;
    this.getRating();
  }
  toggleRating() {
    this.bookEnabled = false;
    this.sendEnabled = false;
  }
  sendBooking(): void {
    this.bookEnabled = false;
    this.sendEnabled = true;
  }
  count() {
    // console.log(this.starsCount, "stars");
  }
}
