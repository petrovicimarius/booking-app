import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { BookingsComponent } from "./components/admin/bookings/bookings.component";
import { ProfileComponent } from "./components/admin/profile/profile.component";
import { PageHeaderComponent } from "./components/shared/page-header/page-header.component";
import { LoginComponent } from "./components/shared/login/login.component";
import { FormsModule } from "@angular/forms";
import { ServicesComponent } from "./components/admin/services/services.component";
import { CompaniesComponent } from "./components/shared/companies/companies.component";
import { OfficesComponent } from "./components/admin/offices/offices.component";
import { PageHeaderAdminComponent } from "./components/admin/page-header-admin/page-header-admin.component";
import { PublicOfficesComponent } from "./components/shared/public-offices/public-offices.component";
import { FilterArrayPipe } from "./filter-array.pipe";
import { PublicServicesComponent } from "./components/shared/public-services/public-services.component";
import { ArraySortPipe } from "./sort-array.pipe";
import { AuthGuard } from "./connection-services/auth-guard.service";
import { AuthService } from "./connection-services/auth.service";
import { ApiConnectionService } from "./connection-services/api-connection/api-connection.service";
import { RatingModule } from "ngx-rating";
import { AgmCoreModule } from "@agm/core";

const routes: Routes = [
  { path: "services", component: ServicesComponent, canActivate: [AuthGuard] },
  { path: "companies", component: CompaniesComponent },
  { path: "offices", component: OfficesComponent, canActivate: [AuthGuard] },
  { path: "offices/:id", component: PublicOfficesComponent },
  { path: "services/:id", component: PublicServicesComponent },
  { path: "bookings", component: BookingsComponent, canActivate: [AuthGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "**", redirectTo: "companies" }
];

@NgModule({
  declarations: [
    AppComponent,
    ServicesComponent,
    BookingsComponent,
    ProfileComponent,
    PageHeaderComponent,
    LoginComponent,
    ServicesComponent,
    CompaniesComponent,
    OfficesComponent,
    PageHeaderAdminComponent,
    PublicOfficesComponent,
    PublicServicesComponent,
    FilterArrayPipe,
    ArraySortPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RatingModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAqcFHBPQuY6E-Fd5mn9DKlks8tHhHHewM"
    }),
    RouterModule.forRoot(routes, { useHash: false })
  ],

  providers: [ApiConnectionService, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
