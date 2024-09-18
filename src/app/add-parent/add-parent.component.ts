import { Component, OnInit } from '@angular/core';
import { ParentsService } from '../services/parents.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-parent',
  templateUrl: './add-parent.component.html',
  styleUrls: ['./add-parent.component.css']
})
export class AddParentComponent implements OnInit {
  parent = {
    firstName: '',
    lastName: '',
    email: '',
    address: ''
  };

  constructor(private parentService: ParentsService, private router: Router) {}

  ngOnInit(): void {}

  addParent(): void {
    this.parentService.addParent(this.parent).subscribe(
      (response) => {
        console.log('Parent added successfully', response);
        this.router.navigate(['/admin']);
      },
      (error) => {
        console.error('Error adding parent', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }
}
