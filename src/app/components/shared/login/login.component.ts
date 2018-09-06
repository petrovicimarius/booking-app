import { Component, OnInit, ViewChild, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Company } from "../companies/company";
import Api from "../../../connection-services/api-connection/api-routes";
import { ApiConnectionService } from "../../../connection-services/api-connection/api-connection.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  @ViewChild("login")
  loginForm: NgForm;
  @ViewChild("reset")
  resetForm: NgForm;
  @ViewChild("create")
  createForm: NgForm;

  public showHide = true;

  public company: Company = new Company();
  public message: String;
  public password_message = "";
  public success_message = "false";

  constructor(
    private _company: ApiConnectionService<Company>,
    private router: Router
  ) {}

  public loginContent = true;
  public resetContent = false;
  public registerContent = false;

  ngOnInit() {}

  showMyPass() {
    this.showHide = !this.showHide;
  }

  onReset() {
    this.resetPassword();
  }
  goToCompanies() {
    this.router.navigate(["/companies"]);
  }
  manageForms(login: boolean, register: boolean, reset: boolean): void {
    this.loginContent = login;
    this.registerContent = register;
    this.resetContent = reset;
  }

  registerUser() {
    console.log("company ", this.company);

    this._company.post(`${Api.base}${Api.register}`, this.company).subscribe(
      (res: any) => {
        console.log("res", res);
        this.manageForms(true, false, false);
      },
      err => {
        console.log(err);
      }
    );
  }

  getCompanyProfile(): void {
    this._company.get(`${Api.base}${Api.profile}`).subscribe((res: any) => {
      console.log("res ", res.company._id);
      localStorage.setItem("id", res.company._id);
    });
  }

  loginUser() {
    console.log("company ", this.company);

    this._company.post(`${Api.base}${Api.login}`, this.company).subscribe(
      (res: any) => {
        console.log("res ", res);
        const token = res.token.toString();
        const auth = res.auth.toString();
        localStorage.setItem("token", token);
        localStorage.setItem("auth", auth);
        console.log("auth", auth);

        this._company.token = token;
        this._company.httpOptions = {
          headers: {
            "x-access-token": token || ""
          }
        };

        console.log("token", token);

        if (auth === "false") {
          this.router.navigate(["/login"]);
        } else {
          localStorage.setItem("token", token);
          localStorage.setItem("email", this.company.email.toString());
          // localStorage.setItem("success_message", this.success_message);
          this.getCompanyProfile();
          console.log("true");
          this.router.navigate(["/offices"]);
          this.password_message = "";
        }
      },
      err => {
        console.log(err);
        console.log("success_message", this.success_message);
        this.password_message = "Your email or password is invalid, try again!";
      }
    );
  }

  // reset password
  resetPassword(): void {
    this._company
      .post(`${Api.base}${Api.reset}`, this.company)
      .subscribe(res => {
        this.manageForms(true, false, false);
      });
  }
}
