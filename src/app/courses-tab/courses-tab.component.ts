import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-courses-tab',
  templateUrl: './courses-tab.component.html',
  styleUrls: ['./courses-tab.component.css']
})
export class CoursesTabComponent implements OnInit {
T:any=[
//   {id:1,Title:"mondialisation",description:"lorem eli lorem",price:"300$",duration:"50 hour"},
// {id:2,Title:"electricité",description:"lorem eli lorem",price:"3000$",duration:"250 hour"},
// {id:3,Title:"html",description:"lorem eli lorem",price:"1500$",duration:"150 hour"}
]
  constructor(
    private router:Router,
    private coursesService:CoursesService

  ) { }

  ngOnInit(): void {
    this.coursesService.getAllcoursees().subscribe((data)=>{
      this.T=data.courses
      
    })
  }
  goToEdit(id:any){
    this.router.navigate([`edit-courses/${id}`])
  }
  delete(id:any){
    this.coursesService.deletecourse(id).subscribe((data)=>{
      console.log('this response from BE',data.isDeleted)
      this.coursesService.getAllcoursees().subscribe((data)=>{
        this.T=data.courses;
      })
    })
  }
  goToInfo(id:any){
    this.router.navigate([`course-info/${id}`])
  }

}
