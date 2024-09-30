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
  imagePreview: any;
  selectedFile: any;
  selectedResume: any;
  role: any;
  errorMessage: string = '';  // Add this line

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.actualPath = this.router.url;
    this.signUpForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{8,15}$/)]],
      childPhone: ['', [ Validators.pattern(/^[0-9]{8,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required]],
      address: ['', [Validators.required]],
      pwd: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
    });

    if (this.actualPath == '/inscription') {
      this.role = 'student';
    } else if (this.actualPath == '/inscriptionParent') {
      this.role = 'parent';
    } else if (this.actualPath == '/inscriptionTeacher') {
      this.role = 'teacher';
    } else {
      this.role = 'admin';
    }

  }

  signUp(): void {
    if (this.actualPath == '/inscription') {
      this.signUpForm.value.role = 'student';
    } else if (this.actualPath == '/inscriptionParent') {
      this.signUpForm.value.role = 'parent';
    } else if (this.actualPath == '/inscriptionTeacher') {
      this.signUpForm.value.role = 'teacher';
    } else {
      this.signUpForm.value.role = 'admin';
    }

    this.userService.signUp(this.signUpForm.value, this.selectedFile, this.selectedResume).subscribe(
      (result: any) => {
        if (result.isAdded) {
          this.router.navigate(['Login']);
        } else {
          this.errorMessage = result.message;  // Set the error message from backend
        }
      },
      (error) => {
        console.error('Signup error', error);
        this.errorMessage = 'An error occurred during sign-up. Please try again later.';
      }
    );
  }

  onImageSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  onIPdfSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.selectedResume=file
  
      // Ensure it's a PDF
      if (file.type === 'application/pdf') {
        // Handle file uploading logic here, e.g., sending it to a server
        const reader = new FileReader();
        
        reader.onload = () => {
          // Perform any actions you need with the file content
          console.log('PDF content:', reader.result);
          // You can display a preview or take further actions based on the PDF content
        };
  
        reader.readAsArrayBuffer(file); // Read the PDF file
  
      } else {
        console.error('Selected file is not a PDF.');
        // Optionally, you could show a validation message
      }
    }
  }
  
}
