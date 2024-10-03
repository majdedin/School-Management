import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { TeachersService } from '../services/teachers.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  course: any = {};
  teachers: any[] = [];  // List of teachers

  constructor(
    private coursesService: CoursesService,
    private teachersService: TeachersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTeachers(); // Load the teachers on init
  }

  loadTeachers(): void {
    this.teachersService.getAllteacheres().subscribe((data) => {
      this.teachers = data.teachers;
    });
  }

  addCourse(): void {
    this.coursesService.addcourse(this.course).subscribe(
      (response) => {
        console.log('Course added successfully', response);
        this.router.navigate(['/admin']); // Navigate back to courses tab after adding
      },
      (error) => {
        console.error('Error adding course', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }
}
