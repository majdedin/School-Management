import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-universities',
  templateUrl: './universities.component.html',
  styleUrls: ['./universities.component.css']
})
export class UniversitiesComponent implements OnInit {
  T:any=[{name:"harvard", adress:"London",img:"assets/img/minh-city.jpg"},
    {name:"mathit", adress:"Paris",img:"assets/img/diploma.jpg"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
