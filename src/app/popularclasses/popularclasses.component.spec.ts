import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularclassesComponent } from './popularclasses.component';

describe('PopularclassesComponent', () => {
  let component: PopularclassesComponent;
  let fixture: ComponentFixture<PopularclassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularclassesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularclassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
