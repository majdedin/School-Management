import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  profileForm!: FormGroup;
  editMode: boolean = false; 
  role: string = ''; 
  selectedResume: File | null = null; 
  selectedFile: File | null = null; 
  imagePreview: any;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserProfile(); // Charger les données de l'utilisateur
  }

  loadUserProfile(): void {
    const connectedUser = localStorage.getItem('connectedeUser');
    const userId = connectedUser ? JSON.parse(connectedUser).id : '';

    this.userService.getUserProfile(userId).subscribe(
      (data) => {
        this.user = data.user;
        this.role = this.user.role; // Stocker le rôle de l'utilisateur

        // Initialiser le formulaire avec les données de l'utilisateur
        this.profileForm = this.formBuilder.group({
          firstName: [this.user.firstName, [Validators.required]],
          lastName: [this.user.lastName, [Validators.required]],
          email: [this.user.email, [Validators.required, Validators.email]],
          role: [{ value: this.user.role, disabled: true }], // Le rôle ne doit pas être modifiable
          age: [this.user.age],
          address: [this.user.address],
          phone: [this.user.phone],
          speciality: [this.user.speciality || ''], // Pour Teacher
          experience: [this.user.experience || ''], // Pour Teacher
          children: [this.user.children || []], // Pour Parent
          courses: [this.user.courses || []], // Pour Student
        });
      },
      (error) => {
        console.error("Error loading profile", error);
        this.router.navigate(['/login']); // Redirige vers login si non connecté
      }
    );
  }

  editProfile(): void {
    this.editMode = true; // Activer le mode édition
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      const formData = new FormData();
      Object.keys(this.profileForm.value).forEach((key) => {
        formData.append(key, this.profileForm.value[key]);
      });
  
      // Append the selected image and resume files if available
      if (this.selectedFile) {
        formData.append('img', this.selectedFile);
      }
      if (this.selectedResume) {
        formData.append('pdf', this.selectedResume);
      }
  
      this.userService.updateUserProfile(this.user._id, formData).subscribe(
        (response) => {
          console.log('Profile updated successfully');
          this.editMode = false;
          this.loadUserProfile(); // Reload the updated profile
        },
        (error) => {
          console.error('Error updating profile', error);
        }
      );
    }
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
  onResumeSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      if (file.type === 'application/pdf') {
        this.selectedResume = file;
      } else {
        console.error('Selected file is not a PDF.');
      }
    }
  }
  cancelEdit(): void {
    this.editMode = false;
    this.loadUserProfile(); // Recharger les données sans modification
  }
}
