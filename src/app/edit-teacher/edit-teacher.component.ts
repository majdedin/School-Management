import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeachersService } from '../services/teachers.service';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent implements OnInit {
  teacher: any = {};
  specialities: string[] = ['networking', 'development', 'project management'];

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

  editTeacher() {
    this.teachersService.editteacher(this.teacher).subscribe(() => {
      this.router.navigate(['/admin']);  // Navigate back to the admin panel after updating
    });
  }
  goBack() {
    this.router.navigate(['/admin']);  // Navigate back to the admin panel
  }
}
