import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(
        private _auth:AuthService,
        private _router:Router
        ){}

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):
     boolean | Observable<boolean> | Promise <boolean>{
        const isAuth = this._auth.getIsAuth();

        if(!isAuth){
            this._router.navigate(['/auth'])
        }
        
        return isAuth;
     }
}