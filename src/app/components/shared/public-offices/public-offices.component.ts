import { Component, OnInit } from '@angular/core';
import { Router, Route, RoutesRecognized, ActivatedRoute } from '@angular/router';
import { Office } from '../../admin/offices/office';
import { ApiConnectionService } from '../../../connection-services/api-connection/api-connection.service';
import { Service } from '../../admin/services/service';
import { Company } from '../companies/company';

@Component({
  selector: 'app-public-offices',
  templateUrl: './public-offices.component.html',
  styleUrls: ['./public-offices.component.css']
})
export class PublicOfficesComponent implements OnInit {

  public id;
  public officesList: Office[] = [];
  public servicesList: Service[] = [];
  public company: Company = new Company();
  public img_url = false;

  constructor(private dataService: ApiConnectionService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    console.log('res', this.id);
    localStorage.setItem('public_company_id', this.id);
  }

  ngAfterViewInit() {
    this.getOffices();
    this.getCompany();
  }

  getCompany(): void {
    this.dataService.getCompany(this.id).subscribe((res: any) => {
      this.company = res.company;
      console.log('res company', this.company);
      if (this.company.image_url) {
        this.img_url = true;
      }
    });
  }

  getOffices(): void {
    this.dataService.getOffices(this.id).subscribe((res: any) => {
      this.officesList = res.offices;
      console.log('res', this.officesList);
    });
  }
  getServices(item): void {
    this.dataService.getServices(item.id).subscribe((res: any) => {
      this.servicesList = res.services;
      console.log('res services', this.servicesList);
    });
  }

  goToServices(item): void {
    console.log('office id', item.id);
    this.getServices(item);
    this.router.navigate(['/services/', item.id]);
  }
}
