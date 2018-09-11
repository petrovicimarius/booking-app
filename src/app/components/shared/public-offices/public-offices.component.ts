import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Office } from "../../admin/offices/office";
import { ApiConnectionService } from "../../../connection-services/api-connection/api-connection.service";
import { Service } from "../../admin/services/service";
import { Company } from "../companies/company";
import Api from "../../../connection-services/api-connection/api-routes";
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
    console.log("res", this.id);
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
        console.log("res company", this.company);
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
        console.log("res", this.officesList);
      },
      err => console.log("Err ", err)
    );
  }
  getServices(item): void {
    this._service.get(`${Api.base}${Api.services}${item.id}`).subscribe(
      (res: any) => {
        this.servicesList = res.services;
        console.log("res services", this.servicesList);
      },
      err => console.log("Err ", err)
    );
  }

  goToServices(item): void {
    console.log("office id", item.id);
    this.getServices(item);
    this.router.navigate(["/services/", item.id]);
  }
}
