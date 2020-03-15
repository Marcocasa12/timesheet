import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from "src/core/service/user.service";

@Component({
  selector: 'login-home-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public router: Router, public auth: AuthenticationService, public userService: UserService) {
    this.createLoginForm();
  }

  ngOnInit() {
  }
  private createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onLogin() {
    let param = this.loginForm.controls['username'].value + "_" + this.loginForm.controls['password'].value;
    this.auth.login(param).subscribe(r => {
      if ((r.response != null)) {
        this.auth.setAuthenticated(r.response.name, r.response.ruolo);
        this.router.navigate(['home']), { replaceUrl: true };
      } else {
        this.router.navigate(['register']), { replaceUrl: true };
      }
    });
  }
  onClickRegister() {
    this.router.navigate(['register']), { replaceUrl: true };
  }
}
