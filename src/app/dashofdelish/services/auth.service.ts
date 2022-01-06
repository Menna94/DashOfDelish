import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { User } from "../models/user.model";

@Injectable()
export class AuthService{
    private token:string;
    //authStatusListener => 
    //pushes authentication info (is the user authenticated or not) to the components that are interested
    private authStatusListener = new Subject<boolean>();
    private isAuthenticated:boolean = false;
    private tokenTimer: any;

    constructor(private _http:HttpClient, private _router:Router){}

//---> Getters <---// 

    getToken(){
        return this.token;
    }

    getIsAuth(){
        return this.isAuthenticated;
    }

    getAuthStatusListener(){
        return this.authStatusListener.asObservable();
    }

//---> Main Functions <---// 
    createUser(fname:string, lname:string, email:string, password:string){
        const user:User = {fname,lname,email,password}
        this._http.post('http://localhost:3000/api/auth/signup', user)
        .subscribe(res=> console.log(res))
    }

    loginUser(email:string, password:string){
        const user:User = {email, password};
        this._http.post<{token:string, expiresIn:number}>('http://localhost:3000/api/auth/login', user)
        .subscribe(res=>{
            const resToken = res.token;
            this.token = resToken;
            if(resToken){
                const expiresInDuration = res.expiresIn;
                this.setAuthTimer(expiresInDuration);

                //the user is authenticated now
                this.isAuthenticated = true;
                this.authStatusListener.next(true);

                //expiration date
                const now = new Date(); //Thu Dec 16 2021 00:14:39 GMT+0200 (Current Date & Time)
                //.getTime => convert it to ms
                //add expiresInDuration after converting it to ms (*1000)
                //convert it to the new date => expirationDate
                const expirationDate = new Date(now.getTime() + (expiresInDuration * 1000))
                this.saveAuthData(resToken, expirationDate);

                //navigate to home page after logging in
                this._router.navigate(['/']);
            }
        })
    }

    logoutUser(){
        //delete token value
        this.token = null;

        //the user is not authenticated anymore
        this.isAuthenticated = false;
        this.authStatusListener.next(false);

        //clear expirationDuration if the user clicked logout
        clearTimeout(this.tokenTimer);

        //clear token from localStorage
        this.clearAuthData();

        //navigate to home page after logging out
        this._router.navigate(['/']);
    }

//---> Helper Functions <---// 

    //automatically authenticate the user if you have the auth info in localStorage
    autoAuthUser(){
        const authInfo = this.getAuthData();

        //if the user is not authenticated (i.e loggedout/ token is expired) => return
        if(!authInfo) return;

        //check if expirationDate is still in the future
        const expiresIn = authInfo.expirationDate.getTime() - new Date().getTime();

        //if the date is still in the future => i.e the token is still valid
        if(expiresIn > 0){
            //update the token
            this.token = authInfo.token;

            //authenticate the user
            this.isAuthenticated = true;
            this.authStatusListener.next(true);

            //set a timer to unauthenticate the user when the token expires
            this.setAuthTimer(expiresIn/1000);
        }

    }

    //Timer to logout and unauthenticate the user when the token expires
    private setAuthTimer(duration:number){
        this.tokenTimer = setTimeout(()=>{
            this.logoutUser();
        }, duration*1000)
    }

    private saveAuthData(token:string, expiresInDate:Date){
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expiresInDate.toISOString());
    }

    private clearAuthData(){
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
    }

    private getAuthData(){
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');

        if(!token || !expirationDate) return

        return{
            token:token,
            expirationDate: new Date(expirationDate)
        }
    }
}