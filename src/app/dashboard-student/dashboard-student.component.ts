import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../services/students.service';
StudentsService

@Component({
  selector: 'app-dashboard-student',
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.css']
})
export class DashboardStudentComponent implements OnInit {
  courses: any[] = [];
  grades: any[] = [];
  coursesWithGrades: any[] = [];

  constructor(private studentService: StudentsService) {}

  ngOnInit(): void {
    const connectedUser = localStorage.getItem('connectedeUser');
      const userId = connectedUser ? JSON.parse(connectedUser).id : '';
    this.studentService.getCoursesForStudent(userId).subscribe((data: any) => {
      this.courses = data.courses;
      this.grades = data.grades;
console.log(data.grades)
      // Perform filtering to match each course with its corresponding grade
      this.coursesWithGrades = this.courses.map((course) => {
        const gradeObj = this.grades.find(
          (g) => g.course.toString() === course._id.toString()
        );
        return {
          course,
          grade: gradeObj ? gradeObj.grade : "No grade yet"
        };
      });
      
    });
  }
}
