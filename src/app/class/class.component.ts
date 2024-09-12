import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
  @Input() classeInput:any;
 

  constructor() { }
  

  ngOnInit(): void {
  }

}
