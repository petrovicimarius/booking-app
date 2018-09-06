import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ApiConnectionService<T> {
  public token: string;
  public httpOptions = {};

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : "";
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "x-access-token": this.token
      })
    };
  }

  get(path: string): Observable<T> {
    return this.http.get<T>(path, this.httpOptions);
  }
  put(path: string, data: T): Observable<T> {
    return this.http.put<T>(path, data, this.httpOptions);
  }
  post(path: string, data: T): Observable<T> {
    return this.http.post<T>(path, data, this.httpOptions);
  }
  delete(path: string): Observable<T> {
    return this.http.delete<T>(path, this.httpOptions);
  }
}
