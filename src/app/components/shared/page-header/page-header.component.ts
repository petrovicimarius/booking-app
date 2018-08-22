import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../../shared/user';
import { ApiConnectionService } from '../../../connection-services/api-connection/api-connection.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router, Route, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})


export class PageHeaderComponent implements OnInit {

  public currentRoute

  @Output()
  public user: User = new User();

  userProfile = [
    { user_id: 1, email: "intern.marius.petrovici@assist.ro", password: "Parola123!", firstName: "Marius", lastName: "Petrovici", active: 1, role: 1 }
  ];


  constructor(router: Router, private dataService: ApiConnectionService) {
    router.events.subscribe((url: any) => console.log(url));
    this.currentRoute = router.url;
    // console.log(router.url);  // to print only path eg:"/login"
    console.log(this.currentRoute);
    if (this.currentRoute == "/dashboard") {

    }


  }


  public visible = false;
  toggle() {

    if (this.visible) {
      document.getElementById('right').style.display = "none";
      this.visible = false;
    } else {
      document.getElementById('right').style.display = "flex";
      this.visible = true;
    }

  }

  // private wholeName: string;

  ngOnInit() {

  }

  getRoute() {
    return window.location.pathname;
  }

  // ngAfterViewInit() {
  //   this.getUserProfile();
  // }


  // getUserProfile(): void {
  //   this.dataService.getUserByEmail(localStorage.getItem('email')).subscribe((res: any) => {
  //     console.log('res ', res);
  //     this.user = res.objects[0];
  //     const role_id = res.objects[0].roles[0].role_id;
  //     // // console.log('user data role ', res.objects[0].roles[0].role_id)
  //     localStorage.setItem('role_id', role_id);
  //     this.wholeName = this.user.firstName + ' ' + this.user.lastName;
  //     console.log('Users::: ' + this.user.firstName + this.user.lastName);
  //   });
  //   // this.wholeName = this.userProfile[0].firstName + ' ' + this.userProfile[0].lastName;
  // }
  // onFileSelected(event) {
  //   console.log(event.srcElement.value);
  //   this.user.image = event.srcElement.value;
  // }

}

