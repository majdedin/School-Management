import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {
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

  goBack() {
    this.router.navigate(['/admin']);
  }
}
