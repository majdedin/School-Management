import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  T:any=[];

  constructor(
    private classService:CoursesService
  ) { }

  ngOnInit(): void {
    this.classService.getAllcoursees().subscribe((data)=>{
      this.T=data.courses
    })
  }

}
