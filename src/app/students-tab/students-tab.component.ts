import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-students-tab',
  templateUrl: './students-tab.component.html',
  styleUrls: ['./students-tab.component.css']
})
export class StudentsTabComponent implements OnInit {
  students: any[] = [];

  constructor(private studentsService: StudentsService, private router: Router) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentsService.getStudents().subscribe((response) => {
      this.students = response.students;
    });
  }

  addStudent() {
    this.router.navigate(['/add-student']);
  }

  editStudent(id: string) {
    this.router.navigate([`/edit-student/${id}`]);
  }

  deleteStudent(id: string) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentsService.deleteStudent(id).subscribe(() => {
        this.loadStudents();
      });
    }
  }
}
