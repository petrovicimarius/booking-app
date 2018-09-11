import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  ApiConnectionService,
  Office,
  Service,
  Company
} from "@app/api-connection";
import Api from "@app/routes";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-public-offices",
  templateUrl: "./public-offices.component.html",
  styleUrls: ["./public-offices.component.css"]
})
export class PublicOfficesComponent implements OnInit {
  public id;
  public officesList: Office[] = [];
  public servicesList: Service[] = [];
  public company: Company = new Company();
  public img_url = false;
  public lat;
  public lng;
  public newAddress;

  constructor(
    private _company: ApiConnectionService<Company>,
    private _office: ApiConnectionService<Office>,
    private _service: ApiConnectionService<Service>,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    localStorage.setItem("public_company_id", this.id);
  }

  ngAfterViewInit() {
    this.getOffices();
    this.getCompany();
  }

  convertAddress(address) {
    this.newAddress = address;
    this.newAddress = this.newAddress.replace(/ /g, "+");
    this.http
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${
          this.newAddress
        }&key=AIzaSyAqcFHBPQuY6E-Fd5mn9DKlks8tHhHHewM`
      )
      .subscribe((res: any) => {
        this.lat = res.results[0].geometry.location.lat;
        this.lng = res.results[0].geometry.location.lng;
      });
  }

  getCompany(): void {
    this._company.get(`${Api.base}${Api.company}${"/"}${this.id}`).subscribe(
      (res: any) => {
        this.company = res.company;
        if (this.company.image_url) {
          this.img_url = true;
        }
      },
      err => console.log("Err ", err)
    );
  }

  getOffices(): void {
    this._office.get(`${Api.base}${Api.offices}${this.id}`).subscribe(
      (res: any) => {
        this.officesList = res.offices;
      },
      err => console.log("Err ", err)
    );
  }
  getServices(item): void {
    this._service.get(`${Api.base}${Api.services}${item.id}`).subscribe(
      (res: any) => {
        this.servicesList = res.services;
      },
      err => console.log("Err ", err)
    );
  }

  goToServices(item): void {
    this.getServices(item);
    this.router.navigate(["/services/", item.id]);
  }
}
