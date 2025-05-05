import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListByCategoryComponent } from './list-by-category.component';

describe('ListByCategoryComponent', () => {
  let component: ListByCategoryComponent;
  let fixture: ComponentFixture<ListByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListByCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
