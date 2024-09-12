import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeachersService } from '../services/teachers.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent implements OnInit {
  teacher: any = {};
  teachersForm!: FormGroup;
  id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private teachersService: TeachersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.teachersService.getteacherById(this.id).subscribe((data) => {
      this.teacher = data.teacher
    });
  }
  editTeacher(): void {
    this.teachersService.editteacher(this.teacher).subscribe((data) => {
      console.log('this response from BE', data.isEdited);
      this.router.navigate(['admin']);
    });

  }

}
