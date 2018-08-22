import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  constructor() { }
  public showHideEdit = true;
  showMyPass() {
    this.showHideEdit = !(this.showHideEdit);
  }
  ngOnInit() {
  }
}
