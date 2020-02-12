import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';


@Component({
  selector: 'register-home-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  onClickLogin(){
    this.router.navigate(['login']);
  }
}
