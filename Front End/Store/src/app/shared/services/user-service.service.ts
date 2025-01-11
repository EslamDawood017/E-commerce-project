import { Injectable, OnInit } from '@angular/core';
import { UserInfo } from '../../Models/UserInfo';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../Environment/environment';
import { Observable } from 'rxjs';
import { LoggedInUser } from '../../Models/LoggedInUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private User : UserInfo | null = null ;
  private loggedInUser! : LoggedInUser;

  constructor(private http : HttpClient) { }

  
  getUserId():number{
    return Number(JSON.parse(localStorage.getItem("UserId")!));
  }
  getAllUser():Observable<any>{
    return this.http.get<any>(`${environment.LocalHostapiUrl}GetAll`);
  }
  deleteUser(id : number):Observable<any>{
    return this.http.delete(`${environment.LocalHostapiUrl}${id}`);
  }
  updateUser(updateUser : UserInfo):Observable<any>{
    return this.http.put(`${environment.LocalHostapiUrl}UpdateProfile` , updateUser);
  }
  getLoggedInUserAsOsObservable():Observable<UserInfo>{
    let userId = this.getUserId();
    return this.http.get<UserInfo>(`${environment.LocalHostapiUrl}GetUserByUserId?Id=${userId}`) 
    
  }
  getLoggedInUser() : Promise<string>{
    return this.getLoggedInUserAsOsObservable().toPromise().then(
      (user) => {
       const Role = user!.role ; 
        return Role ;
      },
      ()=>{
        return '' ;
      })
  }
  
  


  
}
