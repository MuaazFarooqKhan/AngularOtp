import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  debugger;

  show = true;
  form: FormGroup;
  pass: FormGroup;
  Mydata: any;
  otpCode: string;
  constructor(private frmbuilder: FormBuilder,
    private _user: LoginService,
    private _router: Router,
  ) {
    this.form = frmbuilder.group({
      phone_number: ['', [Validators.required]],
    });
    this.pass = frmbuilder.group({
      first: ['', [Validators.required]],
      second: ['', [Validators.required]],
      third: ['', [Validators.required]],
      fourth: ['', [Validators.required]],

    });
  }
  ngOnInit(): void {
  }
  verifyOtp(pass: any) {
    debugger
    this.verifyOtp = this.pass.controls.first.value +
      this.pass.controls.second.value.toString() +
      this.pass.controls.third.value.toString() +
      this.pass.controls.fourth.value.toString()
    this._user.getOtp().subscribe(
      (data: any) => {
        console.log(data);
        this.Mydata = data
        if (this.verifyOtp == this.Mydata) {
          this._router.navigate(['otp']);
        }
        else
          this._router.navigate(['/']);
      }
    );
  }
  PostData(form: any) {
    this.show = !this.show;
    console.log(this.form.value);
    this._user.postNumber(this.form.value).subscribe(
      (data: any) => {
        console.log(data);
      }
    );

  }

}
