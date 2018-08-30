import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { ClickOutsideModule } from 'ng-click-outside';
import { ApiConnectionService } from '../../../connection-services/api-connection/api-connection.service';
import { Router } from '@angular/router';
import { Office } from '../offices/office';



@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.css'],
})
export class OfficesComponent implements OnInit {

  public officesList: Office[] = [];
  public officeData: Office = new Office();

  public editEnabled = false;
  public createVisible = false;
  public createEnabled = false;

  constructor(private dataService: ApiConnectionService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getOffices();
  }

  onClickedOutside(e: Event) {
    console.log('Clicked outside:', e);
    this.toggleUndo();
  }

  getOffices(): void {
    this.dataService.getCompanyOffices().subscribe((res: any) => {
      console.log('res offices', res.offices);
      this.officesList = res.offices;
    });
  }

  deleteOffice(item): void {
    this.dataService.deleteCompanyOffice(item._id).subscribe((res: any) => {
      this.officesList.splice(item, 1);
      console.log(this.officesList);
    });
    window.location.reload();
  }

  updateOffice(item): void {
    this.dataService.updateCompanyOffice(item._id, item).subscribe((res: any) => {
      console.log("res", res);
    });
    this.editEnabled = false;
    window.location.reload();
  }

  addOffice(item): void {
    this.dataService.addCompanyOffice(item).subscribe((res: any) => {
      console.log("res", res);
    });
    this.createEnabled = false;
    window.location.reload();
  }

  toggleEdit(service): void {
    console.log('aaaaaaa', service);
    this.officeData = service;
    console.log('response', this.officeData);

    if (this.editEnabled) {
      this.editEnabled = false;
      window.location.reload();
    }
    else {
      this.editEnabled = true;
    }
    console.log("edit", this.editEnabled);
  }

  toggleAdd(): void {
    this.createEnabled = true;
    console.log('response', this.officeData);
  }

  toggleUndo(): void {
    this.editEnabled = false;
    this.createEnabled = false;
    window.location.reload();
  }

  toggleCreate(): void {
    console.log('response', this.officeData);
    if (this.createEnabled) {
      this.createEnabled = false;
      window.location.reload();
    }
    else {
      this.createEnabled = false;
    }
  }

}
