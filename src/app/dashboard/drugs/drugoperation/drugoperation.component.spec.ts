import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugoperationComponent } from './drugoperation.component';

describe('DrugoperationComponent', () => {
  let component: DrugoperationComponent;
  let fixture: ComponentFixture<DrugoperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrugoperationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrugoperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
