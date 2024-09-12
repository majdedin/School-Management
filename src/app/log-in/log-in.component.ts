import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from "jwt-decode";
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loginForm!: FormGroup;
  erreur: string = "";


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      pwd: ['', [Validators.required]],
    })
  }
  login() {
    console.log("here user", this.loginForm.value)
    this.userService.logIn(this.loginForm.value).subscribe((response) => {
      console.log('here response after login', response)
      if (response.user) {
        sessionStorage.setItem('jwt', response.user)
        //decodage token pr récupérer fname,lastname,............role
        let decoded: any = jwtDecode(response.user);
        console.log('here decoded token', decoded);

        if (decoded.role == "admin") {
          this.router.navigate(['admin'])
        } else {
          this.router.navigate([''])
        }
      }
      else {
        this.erreur = "please check your email/pwd";
      }
    })
  }
}