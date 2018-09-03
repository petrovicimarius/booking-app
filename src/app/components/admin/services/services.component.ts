import { Component, OnInit } from "@angular/core";
import { Company } from "../../shared/companies/company";
import { Service } from "../../admin/services/service";
import { Office } from "../offices/office";
import { ApiConnectionService } from "../../../connection-services/api-connection/api-connection.service";

@Component({
  selector: "app-services",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.css"]
})
export class ServicesComponent<T> implements OnInit {
  public company: Company = new Company();
  public serviceList: Service[] = [];
  public officesList: Office[] = [];
  public serviceData: Service = new Service();

  public editEnabled = false;
  public createVisible = false;
  public createEnabled = false;

  constructor(private dataService: ApiConnectionService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.getServices();
    this.getOffices();
  }

  getServices(): void {
    this.dataService.getCompanyServices().subscribe((res: any) => {
      console.log("res", res.services);
      this.serviceList = res.services;
    });
  }

  getOffices(): void {
    this.dataService.getCompanyOffices().subscribe((res: any) => {
      console.log("res offices", res.offices);
      this.officesList = res.offices;
    });
  }

  deleteService(item): void {
    console.log("rty", item);
    this.dataService.deleteCompanyService(item._id).subscribe((res: any) => {
      console.log(res);
      this.serviceList.splice(item, 1);
      console.log(this.serviceList);
    });
    this.getServices();
  }

  // update() {
  //   this.dataService
  //     .updateById(
  //       `${Api.base}${Api.service}${this.serviceData.id}`,
  //       this.serviceData
  //     )
  //     .subscribe(
  //       (res: any) => {
  //         console.log("res ", res);
  //       },
  //       err => console.log("Err ", err)
  //     );
  // }

  toggleEdit(service): void {
    this.serviceData = service;
    if (this.editEnabled) {
      this.editEnabled = false;
      this.getServices();
    } else {
      this.editEnabled = true;
    }
  }

  addService(item): void {
    this.dataService.addCompanyService(item).subscribe((res: any) => {});
    this.createEnabled = false;
    this.getServices();
  }

  updateService(item): void {
    this.dataService
      .updateCompanyService(item._id, item)
      .subscribe((res: any) => {});
    this.editEnabled = false;
    this.getServices();
  }

  toggleAdd(): void {
    this.serviceData = new Service();
    this.createEnabled = true;
  }

  toggleUndo(): void {
    this.editEnabled = false;
    this.createEnabled = false;
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

  getOfficeId(item): void {
    console.log("getId", item.id);
  }
}
