import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authListenerSubs:Subscription;

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

}
