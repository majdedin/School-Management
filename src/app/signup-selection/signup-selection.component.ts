import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-selection',
  templateUrl: './signup-selection.component.html',
  styleUrls: ['./signup-selection.component.css']
})
export class SignupSelectionComponent {
  
  constructor(private router: Router) {}

  navigateToSignUp(role: string): void {
    if (role === 'student') {
      this.router.navigate(['/inscription']);
    } else if (role === 'parent') {
      this.router.navigate(['/inscriptionParent']);
    } else if (role === 'teacher') {
      this.router.navigate(['/inscriptionTeacher']);
    }
  }
}
