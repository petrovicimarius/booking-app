import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ServiceComponent } from './components/admin/service/service.component';
import { BookingsComponent } from './components/shared/bookings/bookings.component';
import { CalendarComponent } from './components/shared/calendar/calendar.component';
import { ProfileComponent } from './components/shared/profile/profile.component';
import { PageHeaderComponent } from './components/shared/page-header/page-header.component';
import { LoginComponent } from './components/shared/login/login.component';
import { FormsModule } from '@angular/forms';
import { CompanyServicesComponent } from './components/shared/company-services/company-services.component';
import { CompaniesComponent } from './components/shared/companies/companies.component';
import { OfficesComponent } from './components/shared/offices/offices.component';
import { PageHeaderCompanyComponent } from './components/shared/page-header-company/page-header-company.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'offices', component: OfficesComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'companies' }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ServiceComponent,
    BookingsComponent,
    CalendarComponent,
    ProfileComponent,
    PageHeaderComponent,
    LoginComponent,
    CompanyServicesComponent,
    CompaniesComponent,
    OfficesComponent,
    PageHeaderCompanyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: false }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
