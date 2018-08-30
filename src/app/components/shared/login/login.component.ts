import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Company } from '../companies/company';

import { ApiConnectionService } from '../../../connection-services/api-connection/api-connection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('login') loginForm: NgForm;
  @ViewChild('reset') resetForm: NgForm;
  @ViewChild('create') createForm: NgForm;

  public showHide = true;


  public company: Company = new Company();

  public message: String;
  public password_message = '';


  constructor(
    private dataService: ApiConnectionService,
    private router: Router
  ) { }

  public loginContent = true;
  public resetContent = false;
  public registerContent = false;

  ngOnInit() {

  }

  showMyPass() {
    this.showHide = !(this.showHide);
  }

  onReset() {
    this.resetPassword();
  }
  manageForms(login: boolean, register: boolean, reset: boolean): void {
    this.loginContent = login;
    this.registerContent = register;
    this.resetContent = reset;
  }

  registerUser() {
    console.log('company ', this.company);

    this.dataService
      .registerUser(this.company)
      // .subscribe(res => this.manageForms(true, false, false));
      .subscribe((res: any) => {
        console.log('res', res);
        //window.location.reload();
        this.manageForms(true, false, false);
      }, (err) => {
        console.log(err);
      });
  }

  getCompanyProfile(): void {
    this.dataService.getProfile().subscribe((res: any) => {
      console.log('res ', res.company._id);
      localStorage.setItem('id', res.company._id);
    });
  }

  loginUser() {
    console.log('company ', this.company);

    this.dataService
      .loginUser(this.company)
      .subscribe((res: any) => {
        console.log('res ', res);

        const token = res.token;
        console.log('token', token);
        const success_message = res.auth.toString();
        console.log('tip', typeof success_message);
        if (success_message === 'false') {
          this.password_message = 'Your email or password is invalid, try again!'
          this.router.navigate(['/login']);
          console.log('false');


        }
        else {
          localStorage.setItem('token', token);
          localStorage.setItem('email', this.company.email.toString());
          localStorage.setItem('success_message', success_message);
          this.getCompanyProfile();
          console.log('true');

          this.router.navigate(['/offices']);
          //window.location.reload();
          this.password_message = '';
        }

      }, (err) => {
        console.log(err);
      });
  }

  // reset password
  resetPassword(): void {
    this.dataService
      .resetPassword(this.company)
      .subscribe(res => {
        this.manageForms(true, false, false)
      });
  }

}