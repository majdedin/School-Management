import { Component, OnInit } from '@angular/core';
import { ParentsService } from '../services/parents.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-parent',
  templateUrl: './edit-parent.component.html',
  styleUrls: ['./edit-parent.component.css']
})
export class EditParentComponent implements OnInit {
  parent: any = {};

  constructor(
    private parentService: ParentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const parentId = this.route.snapshot.paramMap.get('id');
    this.parentService.getParentById(parentId).subscribe((data) => {
      this.parent = data.parent;
    });
  }

  editParent(): void {
    this.parentService.updateParent(this.parent).subscribe(
      (response) => {
        console.log('Parent updated successfully', response);
        this.router.navigate(['/admin']);
      },
      (error) => {
        console.error('Error updating parent', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }
}
