import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParentsService } from '../services/parents.service';

@Component({
  selector: 'app-parents-tab',
  templateUrl: './parents-tab.component.html',
  styleUrls: ['./parents-tab.component.css']
})
export class ParentsTabComponent implements OnInit {
  parents: any[] = [];

  constructor(private parentsService: ParentsService, private router: Router) {}

  ngOnInit(): void {
    this.loadParents();
  }

  loadParents() {
    this.parentsService.getParents().subscribe((response) => {
      this.parents = response.parents;
    });
  }

  addParent() {
    this.router.navigate(['/add-parent']);
  }

  editParent(id: string) {
    this.router.navigate([`/edit-parent/${id}`]);
  }

  deleteParent(id: string) {
    if (confirm('Are you sure you want to delete this parent?')) {
      this.parentsService.deleteParent(id).subscribe(() => {
        this.loadParents();
      });
    }
  }
}
