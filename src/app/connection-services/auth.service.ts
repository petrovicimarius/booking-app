import { Router } from "@angular/router";
import { Injectable, OnInit } from "@angular/core";
@Injectable()
export class AuthService implements OnInit {
  public token = localStorage.getItem('token').toString();
  public success_message = localStorage.getItem('success_message').toString();
  constructor(private router: Router) { }
  ngOnInit() {

  }

  isAuthenticated() {
    if (this.token != '' && this.success_message === 'true') {
      return true;
    }
    return false;
  }
}