import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {
  courseId: any;
  students: any[] = [];
  course: any = {};

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.loadCourse();
    this.loadStudents();
  }

  // Fetch course details (optional, if needed)
  loadCourse(): void {
    this.coursesService.getcourseById(this.courseId).subscribe((data) => {
      this.course = data.course;
    });
  }

  // Fetch students enrolled in the course
  loadStudents(): void {
    this.studentsService.getStudentsByCourseId(this.courseId).subscribe((data) => {
      this.students = data.students;
    });
  }
}
