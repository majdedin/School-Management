import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn(); // Appel pour définir l'utilisateur
  }

  isLoggedIn() {
    let token = sessionStorage.getItem('jwt');
    if (token) {
      this.user = jwtDecode(token);
    }
    return !!token; // Retourne true si le token existe
  }
  dashbord(){
    
    if (this.user.role == "admin") {
      this.router.navigate(['admin'])
    } else if 
       (this.user.role == "teacher") {
        this.router.navigate(['teacher'])
      
    }else if 
    (this.user.role == "student") {
     this.router.navigate(['student'])
   
 }else if 
 (this.user.role == "parent") {
  this.router.navigate(['parent'])

}
    else {
      this.router.navigate([''])
    }
  
  }

  logout() {
    sessionStorage.removeItem('jwt');
    this.router.navigate(['/Home']);
  }
}
