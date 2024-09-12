import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  
  }
  isLoggedIn(){
    let token =sessionStorage.getItem('token')
    if (token) {
      this.user=jwtDecode(token)
      
    }
    return !!token;
}
logout (){
  sessionStorage.removeItem("token");
  this.router.navigate(['/']);
}
}

// ngOnInit(): void {
//   let token=sessionStorage.getItem('jwt');
//   if (token) {
//     this.decoded=jwtDecode(token)
    
//   }
// }
// isLoggedIn(){
//   let token=sessionStorage.getItem('jwt');
//   if (token) {
//     this.decoded=jwtDecode(token)
    
//   }
//   return !!token
// }

// }
