import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsService } from '../services/students.service';
import { ParentsService } from '../services/parents.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  student: any = {};
  parents: any[] = [];

  constructor(private studentsService: StudentsService,  private parentService: ParentsService,
    private router: Router) {}

  
    ngOnInit(): void {
      // Fetch all parents to populate the dropdown
      this.parentService.getParents().subscribe((data) => {
        this.parents = data.parents;
      });
    }
  

  addStudent() {
    this.studentsService.addStudent(this.student).subscribe(() => {
      this.router.navigate(['/admin']);
    });
  }

  goBack() {
    this.router.navigate(['/admin']);
  }
}
