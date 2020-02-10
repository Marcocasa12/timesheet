import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'login-home-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(public router:Router, public auth:AuthenticationService) { }

  ngOnInit() {
  }

  onClick(){
    this.auth.setAuthenticated();
    this.router.navigate(['home']);
  }

}
