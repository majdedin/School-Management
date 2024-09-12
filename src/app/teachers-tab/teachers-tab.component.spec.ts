import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersTabComponent } from './teachers-tab.component';

describe('TeachersTabComponent', () => {
  let component: TeachersTabComponent;
  let fixture: ComponentFixture<TeachersTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachersTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachersTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
