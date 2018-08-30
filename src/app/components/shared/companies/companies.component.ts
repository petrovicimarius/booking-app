import { Component, OnInit } from '@angular/core';
import { ApiConnectionService } from '../../../connection-services/api-connection/api-connection.service';
import { Company } from './company';

import { Office } from '../../admin/offices/office';
import { Router } from '@angular/router';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  public companiesList: Company[] = [];
  public img_url = true;
  public officesList: Office[] = [];

  constructor(private dataService: ApiConnectionService, private router: Router) { }

  public showHideEdit = true;
  showMyPass() {
    this.showHideEdit = !(this.showHideEdit);
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.getCompanies();
  }

  getCompanies(): void {
    this.dataService.getAllCompanies().subscribe((res: any) => {
      this.companiesList = res.companies;
      console.log('res companies', this.companiesList);
    });
  }

  getOff(item): void {
    this.dataService.getOffices(item.id).subscribe((res: any) => {
      this.officesList = res.offices;
      console.log('res offices', res.offices);
    });
  }

  goToOffices(item): void {
    console.log('company id', item.id);
    this.getOff(item);
    this.router.navigate(['/offices/', item.id]);
  }

}
