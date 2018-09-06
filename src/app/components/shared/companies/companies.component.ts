import { Component, OnInit } from "@angular/core";
import { ApiConnectionService } from "../../../connection-services/api-connection/api-connection.service";
import { Company } from "./company";
import { Office } from "../../admin/offices/office";
import { Router } from "@angular/router";
import Api from "../../../connection-services/api-connection/api-routes";

@Component({
  selector: "app-companies",
  templateUrl: "./companies.component.html",
  styleUrls: ["./companies.component.css"]
})
export class CompaniesComponent<T> implements OnInit {
  public companiesList: Company[] = [];
  public img_url = true;
  public officesList: Office[] = [];
  public starsCount = 3;

  constructor(
    private _company: ApiConnectionService<Company>,
    private _office: ApiConnectionService<Office>,
    private router: Router
  ) {}

  public showHideEdit = true;
  showMyPass() {
    this.showHideEdit = !this.showHideEdit;
  }
  ngOnInit() {}
  ngAfterViewInit() {
    this.getCompanies();
  }

  getCompanies(): void {
    this._company.get(`${Api.base}${Api.company}`).subscribe((res: any) => {
      this.companiesList = res.companies;
      console.log("res companies", this.companiesList);
    });
  }

  getOff(item): void {
    this._office
      .get(`${Api.base}${Api.offices}${item.id}`)
      .subscribe((res: any) => {
        this.officesList = res.offices;
        console.log("res offices", res.offices);
      });
  }

  goToOffices(item): void {
    console.log("company id", item.id);
    this.getOff(item);
    this.router.navigate(["/offices/", item.id]);
  }
  count() {
    console.log(this.starsCount, "stars");
  }
}
