import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  student: any = {};

  constructor(private studentsService: StudentsService, private router: Router) {}

  ngOnInit(): void {}

  addStudent() {
    this.studentsService.addStudent(this.student).subscribe(() => {
      this.router.navigate(['/admin']);
    });
  }

  goBack() {
    this.router.navigate(['/admin']);
  }
}
