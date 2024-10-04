import { Component, OnInit } from '@angular/core';
import { ParentsService } from '../services/parents.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-parent',
  templateUrl: './dashboard-parent.component.html',
  styleUrls: ['./dashboard-parent.component.css']
})
export class DashboardParentComponent implements OnInit {
  childPhone: string = '';  // Model for the input field
  selectedChild: any = null;  // Store selected child details
  errorMessage: string = '';  // Store error message if child not found
  teachersCourses: any[] = [];  // Store courses and teachers
  constructor(private parentService: ParentsService, private router: Router) {}

  ngOnInit(): void { this.getTeachersCourses();}

  // Method to search for the child by phone number
  searchChild(): void {
    this.errorMessage = ''; // Reset error message

    this.parentService.getChildByPhone(this.childPhone).subscribe(
      (data) => {
        if (data.child) {
          console.log(data.child)
          this.selectedChild = data.child;  // Set the child data if found
        } else {
          this.selectedChild = null;
          this.errorMessage = 'Child not found';
        }
      },
      (error) => {
        console.error('Error fetching child data', error);
        this.errorMessage = 'Error fetching child data. Please try again later.';
      }
    );
  }

  // Function to get the grade for a course
  getGrade(child: any, course: any) {
    const gradeObj = child.grades.find((g: any) => g.course._id === course._id);
    return gradeObj ? gradeObj.grade : 'No grade yet';
  }

  // Function to get the evaluation for a course
  getEvaluation(child: any, course: any) {
    const evaluationObj = child.grades.find((g: any) => g.course._id === course._id);
    return evaluationObj ? evaluationObj.evaluation : 'No evaluation yet';
  }

  // Function to view teacher details
  viewTeacher(teacherId: string) {
    this.router.navigate([`/teacher-info/${teacherId}`]);
  }


getTeachersCourses() {
  this.parentService.getCoursesWithTeachers().subscribe(
    (response) => {
      this.teachersCourses = response.courses;
    },
    (error) => {
      console.error('Error fetching courses and teachers:', error);
    }
  );
}



}
