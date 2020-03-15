import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "src/core/service/user.service";
import { FormGroup, FormBuilder } from "@angular/forms";


@Component({
  selector: 'register-home-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  public formgroup: FormGroup;

  constructor(public formBuilder: FormBuilder, 
    public router:Router, 
    public userService: UserService) { 
    this.createLoginForm();
  }

  ngOnInit() {
  }
  private createLoginForm() {
    this.formgroup = this.formBuilder.group({
      name: [""],
      password: [""],
      ruolo: [""]
    })
  }
  onClickLogin(){
    this.router.navigate(['login']);
  };  
  conferma() {
    this.userService.add(this.formgroup.value).subscribe(res => {
      this.router.navigate(["dipendenti"]);
    });
  }
}
