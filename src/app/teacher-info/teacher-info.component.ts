import { Component, Input, OnInit } from '@angular/core';
import { TeachersService } from '../services/teachers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher-info',
  templateUrl: './teacher-info.component.html',
  styleUrls: ['./teacher-info.component.css']
})
export class TeacherInfoComponent implements OnInit {
  teacher:any;
  id:any;
  

  constructor(
    private teacherService:TeachersService,
    private activatedrout:ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.id=this.activatedrout.snapshot.params['id']
    this.teacherService.getteacherById(this.id).subscribe((data)=>{
      console.log('this is from BE',data)
      this.teacher=data.teacher;
    })
}
}
