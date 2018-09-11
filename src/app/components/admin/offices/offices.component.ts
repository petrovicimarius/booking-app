import { Component, OnInit, Injectable } from "@angular/core";
import { ApiConnectionService, Office } from "@app/api-connection";
import Api from "@app/routes";

@Component({
  selector: "app-offices",
  templateUrl: "./offices.component.html",
  styleUrls: ["./offices.component.css"]
})
@Injectable()
export class OfficesComponent implements OnInit {
  [x: string]: any;
  public officesList: Office[] = [];
  public officeData: Office = new Office();
  public elementRef;
  public editEnabled = false;
  public createVisible = false;
  public createEnabled = false;
  public deleteEnabled = false;
  constructor(private _office: ApiConnectionService<Office>) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.getOffices();
  }

  getOffices(): void {
    this._office.get(`${Api.base}${Api.office}`).subscribe(
      (res: any) => {
        this.officesList = res.offices;
      },
      err => console.log("Err ", err)
    );
  }

  deleteOffice(item): void {
    this._office.delete(`${Api.base}${Api.office}${"/"}${item._id}`).subscribe(
      (res: any) => {
        this.officesList.splice(item, 1);
        this.getOffices();
      },
      err => console.log("Err ", err)
    );
    this.deleteEnabled = false;
  }

  updateOffice(item): void {
    this._office
      .put(`${Api.base}${Api.office}${"/"}${item._id}`, this.officeData)
      .subscribe(
        (res: any) => {
          this.getOffices();
        },
        err => console.log("Err ", err)
      );
    this.editEnabled = false;
  }

  addOffice(item): void {
    this._office.post(`${Api.base}${Api.office}`, this.officeData).subscribe(
      (res: any) => {
        this.getOffices();
      },
      err => console.log("Err ", err)
    );
    this.createEnabled = false;
  }

  toggleEdit(service): void {
    this.officeData = service;
    if (this.editEnabled) {
      this.editEnabled = false;
      this.getOffices();
    } else {
      this.editEnabled = true;
    }
  }

  toggleAdd(): void {
    this.officeData = new Office();
    this.createEnabled = true;
  }

  toggleUndo(): void {
    this.editEnabled = false;
    this.createEnabled = false;
    this.deleteEnabled = false;
    this.getOffices();
  }
  toggleDelete() {
    this.deleteEnabled = true;
  }
  toggleCreate(): void {
    this.officeData = new Office();
    if (this.createEnabled) {
      this.createEnabled = false;
      this.getOffices();
    } else {
      this.createEnabled = false;
    }
  }
}
