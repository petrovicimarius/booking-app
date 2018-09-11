import { Component, OnInit } from "@angular/core";
import { ApiConnectionService } from "../../../connection-services/api-connection/api-connection.service";
import { Router } from "@angular/router";
import Api from "../../../connection-services/api-connection/api-routes";
import { Company } from "../../shared/companies/company";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent<T> implements OnInit {
  public company: Company = new Company();
  public img_url = false;
  public starsCount = 3;

  constructor(
    private _company: ApiConnectionService<Company>,
    private router: Router
  ) {}

  onLogOut() {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("auth");
    localStorage.removeItem("id");
    this.router.navigate(["/companies"]);
  }

  ngAfterViewInit() {
    this.getCompanyProfile();
  }

  getCompanyProfile() {
    this._company.get(`${Api.base}${Api.profile}`).subscribe(
      (res: any) => {
        this.company = res.company;
        console.log("res ", res.company);
        if (res.company.image_url) {
          this.img_url = true;
        }
      },
      err => console.log("Err ", err)
    );
  }

  updateCompanyProfile() {
    this._company.put(`${Api.base}${Api.profile}`, this.company).subscribe(
      (res: any) => {
        console.log("res ", res.company);
      },
      err => console.log("Err ", err)
    );
    this.getCompanyProfile();
  }

  ngOnInit() {}
}
