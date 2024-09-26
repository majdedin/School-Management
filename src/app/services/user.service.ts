import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl: string = 'http://localhost:3000/api/user';
  userProfilUrl: string = 'http://localhost:3000/api/user/profil';
  constructor(private http: HttpClient) { }

  signUp(user: any , photo:File) {
    let fData = new FormData();
    fData.append("firstName",user.firstName);
    fData.append("lastName",user.lastName);
    fData.append("email",user.email);
    fData.append("pwd",user.pwd);
    fData.append("role",user.role);
    fData.append("phone",user.phone);
    if(user.role="parent"){
      fData.append("childPhone",user.childPhone);
    }
    
    fData.append("img",photo);
    return this.http.post<{ isAdded: boolean }>(this.userUrl + '/signUp', fData);
  }

  logIn(user: any) {
    return this.http.post<{msg: string; user: any}>(this.userUrl + '/login', user);
  }

  // Récupérer le profil de l'utilisateur
  getUserProfile(id: string): Observable<{ user: any }> {
    return this.http.get<{ user: any }>(`${this.userProfilUrl}/${id}`);
  }
  
  // Mettre à jour le profil de l'utilisateur
  updateUserProfile(id: string, userData: any): Observable<any> {
    return this.http.put(`${this.userProfilUrl}/${id}`, userData);
  }
  
}
