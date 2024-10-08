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

  signUp(user: any, photo: File, resume: File) {
    let fData = new FormData();
    fData.append("firstName", user.firstName);
    fData.append("lastName", user.lastName);
    fData.append("email", user.email);
    fData.append("pwd", user.pwd);
    fData.append("role", user.role);
    fData.append("phone", user.phone);
    fData.append("age", user.age);
    fData.append("address", user.address);
    // Conditionally append childPhone if the user is a parent
    if (user.role === "parent") {
        fData.append("childPhone", user.childPhone);
    }

    // Append the image (photo) and resume (pdf)
    if (photo) {
        fData.append("img", photo);
    }
    if (resume) {
        fData.append("pdf", resume);
    }

    // Send POST request with form data
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
