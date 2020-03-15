import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  private readonly host = "http://localhost:8090/api";
  constructor(private http: HttpClient) {}

  public get(path: string): Observable<any> {
    return this.http.get(this.host + "/" + path);
  }
  public post(path: string, bodyObj: any): Observable<any> {
    console.log(bodyObj);
    return this.http.post(this.host + "/" + path + "/add", bodyObj);
  }
  public delete(path: string, id: string): Observable<any> {
    return this.http.delete(this.host + "/" + path + "/delete/" + id);
  }
  public replace(path: string, id: string, body: any): Observable<any> {
    return this.http.patch(this.host + "/" + path + "/update", body);
  }
  public filter(path: string,value: any) {
    if (value) {
      console.log(this.host + "/" + path + "/filter/" + value);
      return this.http.get(this.host + "/" + path + "/filter/" + value);
    } else {
      return this.get(path);
    }
  }
}
