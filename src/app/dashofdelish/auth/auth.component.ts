import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  formToggler:boolean = false;

  constructor(private _auth:AuthService) { }

  ngOnInit(): void {
  }
  // Toggling
    changeToLogin(){
      this.formToggler = true;
    }

    changeToSignup(){
      this.formToggler = false;
    }

  //actions
  onSignup(form:NgForm){
    if(form.invalid){
      return
    }
    this._auth.createUser(form.value.fname, form.value.lname,form.value.email,form.value.password)
    
  }
  onLogin(form:NgForm){
    this._auth.loginUser(form.value.email, form.value.password)
  }
}
