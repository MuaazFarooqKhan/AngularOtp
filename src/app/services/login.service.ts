import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private _http: HttpClient,
  ) { }


  options: {
    headers: HttpHeaders
  }
  postNumber(body: any) {
    this.setOptions()
    return this._http.post('http://3.142.179.66:8080/api/otp/new/:mobile_no/', body, this.options)
  }

  getOtp() {
    this.setOptions()
    return this._http.get('http://3.142.179.66:8080/api/otp/validate/', this.options)
  }


  setOptions() {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    });
    this.options = { headers: headers };
  }
}
