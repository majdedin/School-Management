import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-tab',
  templateUrl: './courses-tab.component.html',
  styleUrls: ['./courses-tab.component.css']
})
export class CoursesTabComponent implements OnInit {
  courses: any[] = [];

  constructor(private coursesService: CoursesService, private router: Router) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.coursesService.getAllcoursees().subscribe((data) => {
      this.courses = data.courses;
    });
  }

  goToAdd(): void {
    this.router.navigate(['/add-course']);
  }

  goToEdit(courseId: string): void {
    this.router.navigate(['/edit-course', courseId]);
  }

  goToInfo(courseId: string): void {
    this.router.navigate(['/course-info', courseId]);
  }

  delete(courseId: string): void {
    this.coursesService.deletecourse(courseId).subscribe(
      (response) => {
        console.log('Course deleted successfully', response);
        this.loadCourses(); // Reload courses after deletion
      },
      (error) => {
        console.error('Error deleting course', error);
      }
    );
  }
}
