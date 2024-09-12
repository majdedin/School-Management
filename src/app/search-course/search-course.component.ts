import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.css']
})
export class SearchCourseComponent implements OnInit {
  searchForm!: FormGroup;
  search: any={};

  constructor() { }

  ngOnInit(): void {
  }

  searchCorse(){
    console.log("here login object",this.search);
  }

}
