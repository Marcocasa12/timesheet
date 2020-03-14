import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { RouterLink, Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'login-home-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup;
  public listaUsr: any[];

  constructor(public formBuilder: FormBuilder, public router: Router, public auth: AuthenticationService) {
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
    let isUserLogged = this.auth.login(this.loginForm.value).subscribe(r=>{
      console.log(r.value);
    });
    /* this.dipendenteService
      .filter(res.filter)
      .subscribe((res: any) => {
        this.lista = res.response;
      }); */
    
    if (isUserLogged) {
      this.auth.setAuthenticated();
      this.router.navigate(['home']), { replaceUrl: true };
    }else{
      this.router.navigate(['register']), { replaceUrl: true };
    }
  }
  onClickRegister() {
    this.router.navigate(['register']), { replaceUrl: true };
  }

}
