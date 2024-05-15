import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "http://127.0.0.1:7007/Login";

  constructor(private http: HttpClient) { }

  userLogin(data: any) {
    return this.http.post(this.url, data);
  }

}
