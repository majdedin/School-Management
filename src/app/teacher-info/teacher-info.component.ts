import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeachersService } from '../services/teachers.service';

@Component({
  selector: 'app-teacher-info',
  templateUrl: './teacher-info.component.html',
  styleUrls: ['./teacher-info.component.css']
})
export class TeacherInfoComponent implements OnInit {
  teacher: any = {};

  constructor(private teachersService: TeachersService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const teacherId = this.route.snapshot.paramMap.get('id');
    if (teacherId) {
      this.loadTeacher(teacherId);
    }
  }

  loadTeacher(id: string) {
    this.teachersService.getteacherById(id).subscribe((response) => {
      this.teacher = response.teacher;
    });
  }
  goBack() {
    const connectedUser = localStorage.getItem('connectedeUser');
    const role = connectedUser ? JSON.parse(connectedUser).role : '';
    if(role=="admin"){
      this.router.navigate(['/admin']);  // Navigate back to the admin panel
    }
    if(role=="parent"){
      this.router.navigate(['/parent']);  // Navigate back to the admin panel
    }
   
  }
}
