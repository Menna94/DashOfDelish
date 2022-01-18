import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './dashofdelish/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit{
  title = 'dashofdelish';
  url: any;

  constructor(
    private _auth:AuthService,
    private _router:Router
    
  ){}

  ngOnInit(){
    this._auth.autoAuthUser();
    console.log(this._router.url);
    
  }
}
