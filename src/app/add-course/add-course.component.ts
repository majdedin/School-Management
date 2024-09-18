import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  course: any = {};

  constructor(private coursesService: CoursesService, private router: Router) {}

  ngOnInit(): void {}

  addCourse(): void {
    this.coursesService.addcourse(this.course).subscribe(
      (response) => {
        console.log('Course added successfully', response);
        this.router.navigate(['/courses']); // Navigate back to courses tab after adding
      },
      (error) => {
        console.error('Error adding course', error);
      }
    );
  }
}
