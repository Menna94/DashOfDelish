import { Component, OnInit } from '@angular/core';
import { AuthService } from './dashofdelish/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'dashofdelish';

  constructor(private _auth:AuthService){}

  ngOnInit(){
    this._auth.autoAuthUser();
  }
}
