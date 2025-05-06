import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoriesComponent } from './create-categories.component';

describe('CreatCategoriesComponent', () => {
  let component: CreateCategoriesComponent;
  let fixture: ComponentFixture<CreateCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
