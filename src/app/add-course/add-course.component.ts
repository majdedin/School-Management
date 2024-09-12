import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  courseForm!:FormGroup
  course:any={};

  constructor( 
    private formBuilder:FormBuilder,
    private courseService:CoursesService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.courseForm=this.formBuilder.group({
      title:['',[Validators.required]],
      description:['',[Validators.required]],
      price:['',[Validators.required]],
      duration:['',[Validators.required]]
    })
  }

 
  addCourse() {
    // console.log("here course object", this.course);
    this.courseService.addcourse(this.course).subscribe((data)=>{
      console.log("here's response from BE",data);
      this.router.navigate(['admin']);
    });
  }

}
