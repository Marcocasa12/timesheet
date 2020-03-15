import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private api: ApiService) {}
  private readonly path = "user";

  public getAll(): Observable<any> {
    return this.api.get(this.path);
  }
  add(item: any): Observable<any> {
    const obj = { ...item };
    return this.api.post(this.path, obj);
  }
  filter(value: any):any {
    return this.api.filter(this.path,value);
  }
}
