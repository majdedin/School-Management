import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeachersService } from '../services/teachers.service';

@Component({
  selector: 'app-teachers-tab',
  templateUrl: './teachers-tab.component.html',
  styleUrls: ['./teachers-tab.component.css']
})
export class TeachersTabComponent implements OnInit {
  T: any = []

  constructor(
    private router: Router,
    private teacherservice: TeachersService

  ) { }

  ngOnInit(): void {
    this.teacherservice.getAllteacheres().subscribe((data) => {
      this.T = data.teachers
    })
  }
  goToEdit(id: any) {
    this.router.navigate([`edit-teachers/${id}`])
  }
  delete(id: any) {
    this.teacherservice.deleteteacher(id).subscribe((data) => {
      console.log('this response from BE', data)
      this.teacherservice.getAllteacheres().subscribe((data)=>{
        this.T =data.teachers;
      
  })
    });
      
  }
  display(id: any) {
    this.router.navigate([`teacher-info/${id}`])
  }

}
