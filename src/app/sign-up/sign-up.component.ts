import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  test: boolean = false;
  actualPath: any;
  imagePreview:any;
  slectedFile:any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.actualPath = this.router.url
    this.signUpForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required]],
      address: ['', [Validators.required]],
      pwd: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
    });
  }

  signUp(): void {
    if (this.actualPath == '/inscription') {
      this.signUpForm.value.role = 'user';
    }
   else if (this.actualPath == '/inscriptionParent') {
      this.signUpForm.value.role = 'parents';

    }
    else if (this.actualPath == '/inscriptionTeacher') {
      this.signUpForm.value.role= 'teacher';
    }
     else {
      this.signUpForm.value.role = 'admin';

    }
    console.log("Signup form values", this.signUpForm.value);
    this.userService.signUp(this.signUpForm.value,this.slectedFile).subscribe((result) => {

      this.router.navigate(['Login']);
    })

  }
  onImageSelected(event: Event) {
    
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length
    > 0) {
    const file = inputElement.files[0];
    this.slectedFile=file;
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    }
    }
    

}
    


