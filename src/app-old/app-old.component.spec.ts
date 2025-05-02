import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppOldComponent } from './app-old.component';

describe('AppOldComponent', () => {
  let component: AppOldComponent;
  let fixture: ComponentFixture<AppOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppOldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
