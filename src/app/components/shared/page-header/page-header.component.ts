import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-page-header",
  templateUrl: "./page-header.component.html",
  styleUrls: ["./page-header.component.css"]
})
export class PageHeaderComponent implements OnInit {
  public currentRoute;

  constructor(router: Router) {
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
