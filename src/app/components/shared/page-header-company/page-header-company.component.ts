import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../../shared/user';
import { ApiConnectionService } from '../../../connection-services/api-connection/api-connection.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router, Route, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-page-header-company',
  templateUrl: './page-header-company.component.html',
  styleUrls: ['./page-header-company.component.css']
})
export class PageHeaderCompanyComponent implements OnInit {

  public currentRoute

  @Output()
  public user: User = new User();

  userProfile = [
    { user_id: 1, email: "intern.marius.petrovici@assist.ro", password: "Parola123!", firstName: "Marius", lastName: "Petrovici", active: 1, role: 1 }
  ];


  constructor(router: Router, private dataService: ApiConnectionService) {
    router.events.subscribe((url: any) => console.log(url));
    this.currentRoute = router.url;
    // console.log(router.url);  // to print only path eg:"/login"
    console.log(this.currentRoute);
    if (this.currentRoute == "/dashboard") {

    }


  }


  public visible = false;
  toggle() {

    if (this.visible) {
      document.getElementById('right').style.display = "none";
      this.visible = false;
    } else {
      document.getElementById('right').style.display = "flex";
      this.visible = true;
    }

  }

  // private wholeName: string;

  ngOnInit() {

  }

  getRoute() {
    return window.location.pathname;
  }
}
