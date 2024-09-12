import { Component, OnInit } from '@angular/core';
import { TeachersService } from '../services/teachers.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  T: any = []

  constructor(private teacherService: TeachersService) { }

  ngOnInit(): void {
    this.teacherService.getAllteacheres().subscribe((data) => {
      this.T = data.teachers
    })
  }

}
