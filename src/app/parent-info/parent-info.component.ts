import { Component, OnInit } from '@angular/core';
import { ParentsService } from '../services/parents.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-parent-info',
  templateUrl: './parent-info.component.html',
  styleUrls: ['./parent-info.component.css']
})
export class ParentInfoComponent implements OnInit {
  parent: any;

  constructor(
    private parentService: ParentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log("hiiiggggggggggggggggggggggggggggggi")
    const parentId = this.route.snapshot.paramMap.get('id');
    this.parentService.getParentById(parentId).subscribe((data) => {
   
      this.parent = data.parent;
    });
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }
}
