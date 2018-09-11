import { Component, OnInit } from "@angular/core";
import { ApiConnectionService, Service, Office } from "@app/api-connection";
import Api from "@app/routes";

@Component({
  selector: "app-services",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.css"]
})
export class ServicesComponent implements OnInit {
  public serviceList: Service[] = [];
  public officesList: Office[] = [];
  public serviceData: Service = new Service();
  public editEnabled = false;
  public createVisible = false;
  public createEnabled = false;
  public deleteEnabled = false;

  constructor(
    private _services: ApiConnectionService<Service>,
    private _offices: ApiConnectionService<Office>
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.getServices();
    this.getOffices();
  }

  getServices() {
    this._services.get(`${Api.base}${Api.service}`).subscribe(
      (res: any) => {
        this.serviceList = res.services;
      },
      err => console.log("Err ", err)
    );
  }

  getOffices() {
    this._offices.get(`${Api.base}${Api.office}`).subscribe(
      (res: any) => {
        this.officesList = res.offices;
      },
      err => console.log("Err ", err)
    );
  }

  deleteService(item) {
    this._services
      .delete(`${Api.base}${Api.service}${"/"}${item._id}`)
      .subscribe(
        (res: any) => {
          this.serviceList.splice(item, 1);
          this.getServices();
        },
        err => console.log("Err ", err)
      );
    this.deleteEnabled = false;
  }

  update() {
    this._services
      .put(
        `${Api.base}${Api.service}${"/"}${this.serviceData._id}`,
        this.serviceData
      )
      .subscribe(
        (res: any) => {
          this.getServices();
        },
        err => console.log("Err ", err)
      );
    this.toggleUndo();
  }

  toggleEdit(service): void {
    this.serviceData = service;
    if (this.editEnabled) {
      this.editEnabled = false;
      this.getServices();
    } else {
      this.editEnabled = true;
    }
  }

  addService() {
    this._services
      .post(`${Api.base}${Api.service}`, this.serviceData)
      .subscribe(
        (res: any) => {
          this.getServices();
        },
        err => console.log("Err ", err)
      );
    this.createEnabled = false;
  }

  toggleAdd(): void {
    this.serviceData = new Service();
    this.createEnabled = true;
  }
  toggleDelete() {
    this.deleteEnabled = true;
  }
  toggleUndo(): void {
    this.editEnabled = false;
    this.createEnabled = false;
    this.deleteEnabled = false;
    this.getServices();
  }

  toggleCreate(): void {
    if (this.createEnabled) {
      this.createEnabled = false;
      this.getServices();
    } else {
      this.createEnabled = false;
    }
  }
}
