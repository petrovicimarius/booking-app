import { Router } from "@angular/router";
import { Injectable, OnInit } from "@angular/core";
@Injectable()
export class AuthService implements OnInit {
  public auth = localStorage.getItem("auth")
    ? localStorage.getItem("auth").toString()
    : "false";
  constructor(private router: Router) {}

  ngOnInit() {}

  isAuthenticated() {
    if (this.auth === "true") {
      return true;
    } else {
      return false;
    }
  }
}
