import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  T:any=[]

  constructor(
    private coursesService:CoursesService
  ) { }

  ngOnInit(): void {
    this.coursesService.getAllcoursees().subscribe((data)=>{
      this.T=data.courses
    })
  }

}
