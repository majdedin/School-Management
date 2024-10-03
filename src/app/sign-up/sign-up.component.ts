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
  pdfPreview: string = '';

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
    // Set the role based on the path
    if (this.actualPath === '/inscription') {
      this.signUpForm.value.role = 'student';
    } else if (this.actualPath === '/inscriptionParent') {
      this.signUpForm.value.role = 'parent';
    } else if (this.actualPath === '/inscriptionTeacher') {
      this.signUpForm.value.role = 'teacher';
    } else {
      this.signUpForm.value.role = 'admin';
    }
  
    // Call the sign-up service with form data and selected files
    this.userService.signUp(this.signUpForm.value, this.selectedFile, this.selectedResume).subscribe(
      (result: any) => {
        if (result.isAdded) {
          this.router.navigate(['Login']);
        } else {
          this.errorMessage = result.message;  // Display backend error message
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
      this.selectedResume = file; // Save the selected resume file
  
      // Ensure it's a PDF
      if (file.type === 'application/pdf') {
        // Handle file uploading logic or preview
        const reader = new FileReader();
        
        reader.onload = () => {
          // You can display a preview or process the PDF file if needed
          console.log('PDF content:', reader.result);
          // Optionally display a message or perform actions with the PDF data
        };
  
        reader.readAsArrayBuffer(file); // Read the PDF file
      } else {
        console.error('Selected file is not a PDF.');
        // Optionally, display an error message to the user
        this.errorMessage = 'The selected file is not a valid PDF.';
      }
    }
  }
  
  
}
