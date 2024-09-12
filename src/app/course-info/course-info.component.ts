import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {
  course: any;
  id:any;


  constructor(
    private courseService: CoursesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id']
    this.courseService.getcourseById(this.id).subscribe((data)=>{
      this.course=data.course
    })
  }

}
