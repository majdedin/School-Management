import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../services/students.service';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-enroll-student',
  templateUrl: './enroll-student.component.html',
  styleUrls: ['./enroll-student.component.css']
})
export class EnrollStudentComponent implements OnInit {
  studentId: any;
  student: any = {};
  courses: any[] = []; // Available courses
  selectedCourseId: any;

  constructor(
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('id');
    this.loadStudent();
    this.loadCourses();
  }

  // Fetch student details
  loadStudent(): void {
    this.studentsService.getStudentById(this.studentId).subscribe((data) => {
      this.student = data.student;
    });
  }

  // Fetch all courses
  loadCourses(): void {
    this.coursesService.getAllcoursees().subscribe((data) => {
      this.courses = data.courses;
    });
  }

  // Enroll the student in the selected course
  enrollStudent(): void {
    if (this.selectedCourseId) {
      this.studentsService.enrollStudent(this.studentId, this.selectedCourseId).subscribe(
        (response) => {
          console.log('Student enrolled in course', response);
          //this.router.navigate(['/admin']); // Navigate back to students list
        },
        (error) => {
          console.error('Error enrolling student', error);
        }
      );
    }
  }

  // Navigate back to previous page
  goBack(): void {
    this.router.navigate(['/admin']);
  }
}
