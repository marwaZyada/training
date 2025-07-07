import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlldrugComponent } from './alldrug.component';

describe('AlldrugComponent', () => {
  let component: AlldrugComponent;
  let fixture: ComponentFixture<AlldrugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlldrugComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlldrugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
