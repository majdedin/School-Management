import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurteachersComponent } from './ourteachers.component';

describe('OurteachersComponent', () => {
  let component: OurteachersComponent;
  let fixture: ComponentFixture<OurteachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurteachersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurteachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
