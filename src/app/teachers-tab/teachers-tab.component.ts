import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeachersService } from '../services/teachers.service';

@Component({
  selector: 'app-teachers-tab',
  templateUrl: './teachers-tab.component.html',
  styleUrls: ['./teachers-tab.component.css']
})
export class TeachersTabComponent implements OnInit {
  teachers: any[] = [];

  constructor(private teachersService: TeachersService, private router: Router) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers() {
    this.teachersService.getAllteacheres().subscribe((response: any) => {
      this.teachers = response.teachers;
    });
  }

  addNewTeacher() {
    this.router.navigate(['/add-teacher']);  // Redirect to the add teacher component
  }

  display(id: string) {
    this.router.navigate(['/teacher-info', id]);  // Redirect to teacher info component
  }

  editTeacher(id: string) {
    this.router.navigate(['/edit-teachers', id]);  // Redirect to edit teacher component
  }

  deleteTeacher(id: string) {
    this.teachersService.deleteteacher(id).subscribe(() => {
      this.loadTeachers();  // Reload the teachers list after deletion
    });
  }
  validateTeacher(teacherId: string): void {
    this.teachersService.validateTeacher(teacherId).subscribe(response => {
      alert('Teacher validated successfully!');
      this.loadTeachers(); // Refresh the list to show updated status
    }, error => {
      console.error('Error validating teacher', error);
    });
  }
}
