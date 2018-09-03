import { Component, OnInit, ViewChild, Output } from "@angular/core";
import { ApiConnectionService } from "../../../connection-services/api-connection/api-connection.service";
import { Router, Route, RoutesRecognized } from "@angular/router";

@Component({
  selector: "app-page-header",
  templateUrl: "./page-header.component.html",
  styleUrls: ["./page-header.component.css"]
})
export class PageHeaderComponent implements OnInit {
  public currentRoute;

  constructor(router: Router, private dataService: ApiConnectionService) {
    router.events.subscribe((url: any) => console.log(url));
    this.currentRoute = router.url;

    console.log(this.currentRoute);
    if (this.currentRoute == "/dashboard") {
    }
  }

  public visible = false;
  toggle() {
    if (this.visible) {
      document.getElementById("right").style.display = "none";
      this.visible = false;
    } else {
      document.getElementById("right").style.display = "flex";
      this.visible = true;
    }
  }

  ngOnInit() {}

  getRoute() {
    return window.location.pathname;
  }
}
