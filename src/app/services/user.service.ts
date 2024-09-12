import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl: string = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) { }
  signUp(user: any , photo:File) {
    let fData = new FormData();
    fData.append("firstName",user.firstName)
    fData.append("lastName",user.lastName)
    fData.append("email",user.email)
    fData.append("pwd",user.pwd)
    fData.append("role",user.role)
    fData.append("img",photo)
    return this.http.post<{ isAdded: boolean }>(this.userUrl+'/signUp', fData);
  }
  logIn(user: any){
    return this.http.post<{msg:string;user:any}>(this.userUrl+'/login',user);
  }
}


