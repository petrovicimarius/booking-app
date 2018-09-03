import { Component, OnInit, ViewChild, Output } from "@angular/core";
import {
  Router,
  Route,
  RoutesRecognized,
  ActivatedRoute
} from "@angular/router";

@Component({
  selector: "app-page-header-admin",
  templateUrl: "./page-header-admin.component.html",
  styleUrls: ["./page-header-admin.component.css"]
})
export class PageHeaderAdminComponent implements OnInit {
  public currentRoute;

  @Output()
  public id;
  public visible = false;

  constructor(private route: ActivatedRoute) {
    // this.id = route.snapshot.params.id;
    this.id = localStorage.getItem("id");
  }

  ngOnInit() {}

  toggle() {
    if (this.visible) {
      document.getElementById("right").style.display = "none";
      this.visible = false;
    } else {
      document.getElementById("right").style.display = "inline";
      this.visible = true;
    }
  }
}
