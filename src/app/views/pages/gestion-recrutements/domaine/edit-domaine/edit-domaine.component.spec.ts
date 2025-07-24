import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDomaineComponent } from './edit-domaine.component';

describe('EditDomaineComponent', () => {
  let component: EditDomaineComponent;
  let fixture: ComponentFixture<EditDomaineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDomaineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDomaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
