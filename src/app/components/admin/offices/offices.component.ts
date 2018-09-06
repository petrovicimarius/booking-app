import { Component, OnInit, ElementRef } from "@angular/core";
import { ApiConnectionService } from "../../../connection-services/api-connection/api-connection.service";
import { Office } from "../offices/office";
import Api from "../../../connection-services/api-connection/api-routes";

@Component({
  selector: "app-offices",
  templateUrl: "./offices.component.html",
  styleUrls: ["./offices.component.css"]
  // host: { "(document:click)": "handleClick($event)" }
})
export class OfficesComponent<T> implements OnInit {
  [x: string]: any;
  public officesList: Office[] = [];
  public officeData: Office = new Office();
  public elementRef;
  public editEnabled = false;
  public createVisible = false;
  public createEnabled = false;

  constructor(
    private _office: ApiConnectionService<Office>,
    private _element: ElementRef
  ) {
    this.elementRef = _element;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.getOffices();
  }

  handleClick(event) {
    let clickedComponent = event.target;
    let inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      this.clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (inside) {
      console.log("inside");
    } else {
      console.log("outside");
    }
  }

  onClickedOutside(e: Event) {
    console.log("Clicked outside:", e);
    this.toggleUndo();
  }

  getOffices(): void {
    this._office.get(`${Api.base}${Api.office}`).subscribe(
      (res: any) => {
        console.log("res offices", res.offices);
        this.officesList = res.offices;
      },
      err => console.log("Err ", err)
    );
  }

  deleteOffice(item): void {
    this._office.delete(`${Api.base}${Api.office}${"/"}${item._id}`).subscribe(
      (res: any) => {
        this.officesList.splice(item, 1);
        console.log("res", res);
        this.getOffices();
      },
      err => console.log("Err ", err)
    );
  }

  updateOffice(item): void {
    this._office
      .put(`${Api.base}${Api.office}${"/"}${item._id}`, this.officeData)
      .subscribe(
        (res: any) => {
          console.log("res", res);
          this.getOffices();
        },
        err => console.log("Err ", err)
      );
    this.editEnabled = false;
  }

  addOffice(item): void {
    this._office.post(`${Api.base}${Api.office}`, this.officeData).subscribe(
      (res: any) => {
        console.log("res", res);
        this.getOffices();
      },
      err => console.log("Err ", err)
    );
    this.createEnabled = false;
  }

  toggleEdit(service): void {
    console.log("aaaaaaa", service);
    this.officeData = service;
    console.log("response", this.officeData);

    if (this.editEnabled) {
      this.editEnabled = false;
      this.getOffices();
    } else {
      this.editEnabled = true;
    }
    console.log("edit", this.editEnabled);
  }

  toggleAdd(): void {
    this.officeData = new Office();
    this.createEnabled = true;
    console.log("response", this.officeData);
  }

  toggleUndo(): void {
    this.editEnabled = false;
    this.createEnabled = false;
    this.getOffices();
  }

  toggleCreate(): void {
    console.log("response", this.officeData);
    this.officeData = new Office();
    if (this.createEnabled) {
      this.createEnabled = false;
      this.getOffices();
    } else {
      this.createEnabled = false;
    }
  }
}
