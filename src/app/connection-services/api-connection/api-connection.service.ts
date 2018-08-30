import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Company } from "../../components/shared/companies/company";
import { Service } from "../../components/admin/services/service";
import { Office } from "../../components/admin/offices/office";
import { Booking } from "../../components/admin/bookings/booking";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "x-access-token": localStorage.getItem("token")
      ? localStorage.getItem("token")
      : ""
  })
};

const Api = {
  base: "http://localhost:3000/api/",
  register: "auth/register",
  login: "auth/login",
  reset: "auth/forgot",
  profile: "company/profile",
  service: "service",
  office: "office",
  booking: "booking",
  company: "company/public",
  offices: "office/public/",
  services: "service/public/"
};

@Injectable({
  providedIn: "root"
})
export class ApiConnectionService {
  constructor(private http: HttpClient) {}

  registerUser(data: Company): Observable<Company> {
    return this.http.post<Company>(Api.base + Api.register, data, httpOptions);
  }

  loginUser(data: Company): Observable<Company> {
    return this.http.post<Company>(Api.base + Api.login, data, httpOptions);
  }

  resetPassword(data: Company) {
    return this.http.post<Company>(Api.base + Api.reset, data, httpOptions);
  }

  updateProfile(data: Company): Observable<Company> {
    return this.http.put<Company>(Api.base + Api.profile, data, httpOptions);
  }
  getProfile(): Observable<Company> {
    return this.http.get<Company>(Api.base + Api.profile, httpOptions);
  }

  getCompanyServices(): Observable<Service[]> {
    return this.http.get<Service[]>(Api.base + Api.service, httpOptions);
  }
  deleteCompanyService(id: String): Observable<Service> {
    return this.http.delete<Service>(
      Api.base + Api.service + "/" + id,
      httpOptions
    );
  }
  updateCompanyService(id: String, data: Service): Observable<Service> {
    return this.http.put<Service>(
      Api.base + Api.service + "/" + id,
      data,
      httpOptions
    );
  }
  addCompanyService(data: Service): Observable<Service> {
    return this.http.post<Service>(Api.base + Api.service, data, httpOptions);
  }

  getCompanyOffices(): Observable<Office[]> {
    return this.http.get<Office[]>(Api.base + Api.office, httpOptions);
  }
  deleteCompanyOffice(id: String): Observable<Office> {
    return this.http.delete<Office>(
      Api.base + Api.office + "/" + id,
      httpOptions
    );
  }
  updateCompanyOffice(id: String, data: Office): Observable<Office> {
    return this.http.put<Office>(
      Api.base + Api.office + "/" + id,
      data,
      httpOptions
    );
  }
  addCompanyOffice(data: Office): Observable<Office> {
    return this.http.post<Office>(Api.base + Api.office, data, httpOptions);
  }

  getCompanyBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(Api.base + Api.booking, httpOptions);
  }

  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(Api.base + Api.company, httpOptions);
  }

  getCompany(id: String): Observable<Company> {
    return this.http.get<Company>(Api.base + Api.company + "/" + id);
  }
  getOffices(id: String): Observable<Office[]> {
    return this.http.get<Office[]>(Api.base + Api.offices + id, httpOptions);
  }
  getOffice(id: String): Observable<Office> {
    return this.http.get<Office>(Api.base + Api.office + "/" + id, httpOptions);
  }
  getServices(id: String): Observable<Service[]> {
    return this.http.get<Service[]>(Api.base + Api.services + id, httpOptions);
  }

  addBooking(data: Booking): Observable<Booking> {
    return this.http.post<Booking>(Api.base + Api.booking, data);
  }
}
