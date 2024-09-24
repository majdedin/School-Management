import { Component, OnInit } from '@angular/core';
import { ParentsService } from '../services/parents.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-parent',
  templateUrl: './dashboard-parent.component.html',
  styleUrls: ['./dashboard-parent.component.css']
})
export class DashboardParentComponent implements OnInit {
  children: any[] = [];

  constructor(private parentService: ParentsService,  private router: Router) {}

  ngOnInit(): void {
    this.loadParentChildren();
  }

  loadParentChildren(): void {
    const connectedUser = localStorage.getItem('connectedeUser');
    const userId = connectedUser ? JSON.parse(connectedUser).id : '';
  
    this.parentService.getChildrenForParent(userId).subscribe(
      (data: any) => {
        console.log(data)
        // Assuming response contains children array
        this.children = data.children.map((child: any) => {
          // Map each child with their courses and grades
          const coursesWithGrades = child.courses.map((course: any) => {
            const gradeObj = child.grades.find(
              (g: any) => g.course.toString() === course._id.toString()
            );
            return {
              course,
              grade: gradeObj ? gradeObj.grade : 'No grade yet',
            };
          });
  
          // Return the child object with their courses and grades
          return {
            ...child,
            coursesWithGrades, // Attach coursesWithGrades array to the child object
          };
        });
      },
      (error) => {
        console.error('Error fetching children', error);
      }
    );
  }
  

  
 // Helper function to get the grade for a specific course
 getGrade(child: any, course: any): string {
  const gradeObj = child.grades.find(
    (g: any) => g.course._id === course._id
  );
  return gradeObj ? gradeObj.grade : 'No grade yet';
}
viewTeacher(id: any): void {
 console.log(id)
  this.router.navigate(['/teacher-info', id]);  // Redirect to teacher info component
}


}
