import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  student: any = {};

  constructor(private studentsService: StudentsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const studentId = this.route.snapshot.paramMap.get('id');
    if (studentId) {
      this.loadStudent(studentId);
    }
  }

  loadStudent(id: string) {
    this.studentsService.getStudentById(id).subscribe((response) => {
      this.student = response.student;
    });
  }

  editStudent() {
    this.studentsService.updateStudent(this.student).subscribe(() => {
      this.router.navigate(['/admin']);
    });
  }

  goBack() {
    this.router.navigate(['/admin']);
  }
}
