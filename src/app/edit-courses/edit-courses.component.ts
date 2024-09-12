import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-edit-courses',
  templateUrl: './edit-courses.component.html',
  styleUrls: ['./edit-courses.component.css']
})
export class EditCoursesComponent implements OnInit {
  course: any = {};
  coursesForm!: FormGroup;
  id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.coursesService.getcourseById(this.id).subscribe((data)=>{
      this.course=data.course
    });
  }
  editCourse(): void {
    this.coursesService.editcourse(this.course).subscribe((response) => {
      console.log('this is response from BE', response.isEdited);
      this.router.navigate(['admin']);
    });
  }

}
