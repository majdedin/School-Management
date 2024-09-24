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
  editMode: boolean = false; // Mode d'édition activé/désactivé
  role: string = ''; // Pour stocker le rôle de l'utilisateur connecté

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
      const updatedData = this.profileForm.value;
      const connectedUser = localStorage.getItem('connectedeUser');
      const userId = connectedUser ? JSON.parse(connectedUser).id : '';

      // Appeler le service pour mettre à jour le profil avec l'ID utilisateur
      this.userService.updateUserProfile(userId, updatedData).subscribe(
        (response) => {
          console.log('Profile updated successfully', response);
          this.editMode = false;  // Désactiver le mode édition
          this.loadUserProfile();  // Recharger les données du profil mises à jour
        },
        (error) => {
          console.error('Error updating profile', error);
        }
      );
    }
  }

  cancelEdit(): void {
    this.editMode = false;
    this.loadUserProfile(); // Recharger les données sans modification
  }
}
