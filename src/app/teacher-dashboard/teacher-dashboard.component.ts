import { Component, OnInit } from '@angular/core';
import { TeachersService } from '../services/teachers.service';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {
  newCourse = {
    title: '',
    description: '',
    duration: '',
    ageOfKids:null,
    price: null
  };
  editingCourse: any = null; // Holds the course being edited
  courses: any[] = [];
  teacher: any;
  selectedCourseStudents: any[] = [];
  selectedCourseTitle = '';
selctedCourseId: any;

  constructor(private teacherService: TeachersService, private courseService: CoursesService) {}

  ngOnInit(): void {
    this.loadTeacherCourses();
    this.loadTeacher();
  }

  loadTeacher(): void {
    const connectedUser = localStorage.getItem('connectedeUser');
    const teacherId = connectedUser ? JSON.parse(connectedUser).id : '';
    this.teacherService.getteacherById(teacherId).subscribe((data: any) => {
      this.teacher = data.teacher;
    });
  }
  loadTeacherCourses(): void {
    const connectedUser = localStorage.getItem('connectedeUser');
      const teacherId = connectedUser ? JSON.parse(connectedUser).id : '';
    this.teacherService.getTeacherCourses(teacherId).subscribe(
      (response) => {
        this.courses = response.courses;
      },
      (error) => {
        console.error('Error fetching teacher courses', error);
      }
    );
  }


  addCourse() {
    if (this.editingCourse) {
      // If editing, update the course
      console.log(this.newCourse)
      this.courseService.editcourse(this.newCourse).subscribe(() => {
        this.loadTeacherCourses();
        this.resetForm();
      });
    } else {
      const connectedUser = localStorage.getItem('connectedeUser');
    const teacherId = connectedUser ? JSON.parse(connectedUser).id : '';    this.teacherService.addCourse(teacherId, this.newCourse).subscribe(
      (response) => {
        console.log('Course added successfully', response);
        this.loadTeacherCourses(); // Reload courses after adding
      },
      (error) => {
        console.error('Error adding course', error);
      }
    );
    }
  }


  viewStudents(courseId: string): void {
    this.selctedCourseId=courseId
    this.courseService.getCourseStudents(courseId).subscribe(
      (data) => {
        this.selectedCourseStudents = data.students.map((student: any) => {
          // Find the grade for the current course, if it exists
          const courseGrade = student.grades.find((grade:any) => grade.course.toString() === courseId);
          return {
            ...student,
            grade: courseGrade ? courseGrade.grade : null ,// Set grade if exists
            evaluation: courseGrade ? courseGrade.evaluation : null // Set grade if exists
          };
        });
        this.selectedCourseTitle = this.courses.find(course => course._id === courseId).title;
      },
      (error) => {
        console.error('Error loading students', error);
      }
    )
  }

  assignGradeAndEvaluation(studentId: string,  grade: number, evaluation: string): void {
    // Update student's grade and evaluation
    this.courseService.assignGrade(studentId, this.selctedCourseId, { grade, evaluation })
      .subscribe(() => {
        console.log('Grade and evaluation assigned successfully');
      });
  }
  
  resetForm() {
    this.newCourse = {
      title: '',
      description: '',
      duration: '',
      ageOfKids:null,
      price: null
    };
    this.editingCourse = null;
  }
    // Edit a course (populate form with course data)
    editCourse(course: any) {
      this.editingCourse = course;
      this.newCourse = { ...course }; // Copy course data into the form
    }
  
    // Delete a course
    deleteCourse(courseId: string) {
      if (confirm('Are you sure you want to delete this course?')) {
        this.courseService.deletecourse(courseId).subscribe(() => {
          this.loadTeacherCourses();
        });
      }
    }
    
}
