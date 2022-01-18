import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css'],
})
export class HomeHeaderComponent implements OnInit {
  private authListenerSubs:Subscription;
  toggle:boolean = false;
  userIsAuth:boolean = false

  constructor(private _auth:AuthService) { }

  ngOnInit(): void {
    this.userIsAuth = this._auth.getIsAuth();
    
    this.authListenerSubs = this._auth.getAuthStatusListener().subscribe(
      isAuth=>{
        this.userIsAuth = isAuth;
      }
    );
  }


  onLogout(){
    this._auth.logoutUser();
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

  addActiveClass(){
    this.toggle = !this.toggle
  }

}
