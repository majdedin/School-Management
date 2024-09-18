import { Component, OnInit } from '@angular/core';
import { ParentsService } from '../services/parents.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parents-tab',
  templateUrl: './parents-tab.component.html',
  styleUrls: ['./parents-tab.component.css']
})
export class ParentsTabComponent implements OnInit {
  parents: any[] = [];

  constructor(private parentService: ParentsService, private router: Router) {}

  ngOnInit(): void {
    this.loadParents();
  }

  loadParents(): void {
    this.parentService.getParents().subscribe((data) => {
      this.parents = data.parents;
    });
  }

  addParent(): void {
    this.router.navigate(['/add-parent']);
  }

  editParent(parentId: string): void {
    this.router.navigate(['/edit-parent', parentId]);
  }

  deleteParent(parentId: string): void {
    this.parentService.deleteParent(parentId).subscribe(
      (response) => {
        console.log('Parent deleted successfully', response);
        this.loadParents(); // Refresh the list after deletion
      },
      (error) => {
        console.error('Error deleting parent', error);
      }
    );
  }
  displayParent(parentId: string): void {
    this.router.navigate(['/parent-info', parentId]);  // Navigate to Parent Info page
  }
}
