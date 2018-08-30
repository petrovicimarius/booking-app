import { Component, OnInit } from '@angular/core';
import { ApiConnectionService } from '../../../connection-services/api-connection/api-connection.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Company } from '../../shared/companies/company';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public company: Company = new Company();
  public img_url = false;

  constructor(private dataService: ApiConnectionService, private router: Router, private http: HttpClient) { }

  onLogOut() {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('success_message');
    localStorage.removeItem('id');
    this.router.navigate(['/companies']);
    // window.location.reload();
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.getCompanyProfile();

  }
  getCompanyProfile(): void {
    this.dataService.getProfile().subscribe((res: any) => {
      console.log('res ', res.company);
      this.company = res.company;
      if (res.company.image_url) {
        this.img_url = true;
      }
    });
  }

  updateCompanyProfile(): void {
    console.log('this.company ', this.company);
    this.dataService.updateProfile(this.company).subscribe((res: any) => {
      console.log('res', res);
    }, err => {
      console.log('Err: ', err);

    });
  }

  ngOnInit() {
  }

}
