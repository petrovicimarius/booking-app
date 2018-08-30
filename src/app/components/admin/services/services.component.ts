import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../../shared/companies/company';
import { Service } from '../../admin/services/service';
import { Office } from '../offices/office';
import { ApiConnectionService } from '../../../connection-services/api-connection/api-connection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  public company: Company = new Company();
  public serviceList: Service[] = [];
  public officesList: Office[] = [];
  public serviceData: Service = new Service();

  public editEnabled = false;
  public createVisible = false;
  public createEnabled = false;

  constructor(private dataService: ApiConnectionService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getServices();
    this.getOffices();
  }

  getServices(): void {
    this.dataService.getCompanyServices().subscribe((res: any) => {
      console.log('res', res.services);
      this.serviceList = res.services;
    });
  }

  getOffices(): void {
    this.dataService.getCompanyOffices().subscribe((res: any) => {
      console.log('res offices', res.offices);
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
    window.location.reload();
  }

  toggleEdit(service): void {
    console.log('aaaaaaa', service);
    this.serviceData = service;
    console.log('response', this.serviceData);

    if (this.editEnabled) {
      this.editEnabled = false;
      window.location.reload();
    }
    else {
      this.editEnabled = true;
    }
    console.log("edit", this.editEnabled);
  }

  addService(item): void {
    this.dataService.addCompanyService(item).subscribe((res: any) => {
      console.log("res", res);
    });
    this.createEnabled = false;
    window.location.reload();
  }

  updateService(item): void {
    console.log("before res", item);
    this.dataService.updateCompanyService(item._id, item).subscribe((res: any) => {
      console.log("res", res);
    });
    this.editEnabled = false;
    window.location.reload();
  }

  toggleAdd(): void {
    this.createEnabled = true;
    console.log('response', this.serviceData);
  }

  toggleUndo(): void {
    this.editEnabled = false;
    this.createEnabled = false;
    window.location.reload();
  }

  toggleCreate(): void {
    console.log('response', this.serviceData);
    if (this.createEnabled) {
      this.createEnabled = false;
      window.location.reload();
    }
    else {
      this.createEnabled = false;
    }
  }

  getOfficeId(item): void {
    console.log('getId', item.id);
  }

}
