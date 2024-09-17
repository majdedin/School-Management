import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsTabComponent } from './parents-tab.component';

describe('ParentsTabComponent', () => {
  let component: ParentsTabComponent;
  let fixture: ComponentFixture<ParentsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentsTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
