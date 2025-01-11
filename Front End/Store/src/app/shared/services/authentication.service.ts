import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterUser } from '../../Models/registerUser';
import { LoginUser } from '../../Models/loginUser';
import { Router } from '@angular/router';
import { UserInfo } from '../../Models/UserInfo';
import { environment } from '../../../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

   
  private ApiUrl = "http://localhost:5295/Authentication/Register"

  constructor(private http : HttpClient , private router : Router) { }

  register(userData : RegisterUser) : Observable<any>{
    return this.http.post<any>(this.ApiUrl ,userData);
  }
  isUserNameExist(userName : string):Observable<boolean>{
    return this.http.get<boolean>(`${environment.LocalHostapiUrl}Authentication/isUserExist?UserName=${userName}`);
  }
  isEmailExist(email : string):Observable<boolean>{
    return this.http.get<boolean>(`${environment.LocalHostapiUrl}Authentication/isEmailExist?email=${email}`);
  }
  Login(user : LoginUser):Observable<{token : string}>{
    return this.http.post<{token : string}>(`${environment.LocalHostapiUrl}Authentication/Login` ,user);
  }
  isLogedIn():boolean {
    return localStorage.getItem('token') != null ? true : false;
  }
  getUserInfoByUserName(userName : string):Observable<UserInfo>{
    return this.http.get<UserInfo>(`${environment.LocalHostapiUrl}GetByUserName?userName=${userName}`);
  }
  getProfile(id:number):Observable<any>{
    return this.http.get(`${environment.LocalHostapiUrl}GetUserByUserId?Id=${id}`);
  }
  updateProfile(data: any):Observable<any>{
    return this.http.put(`${environment.LocalHostapiUrl}UpdateProfile` , data);
  }
}
