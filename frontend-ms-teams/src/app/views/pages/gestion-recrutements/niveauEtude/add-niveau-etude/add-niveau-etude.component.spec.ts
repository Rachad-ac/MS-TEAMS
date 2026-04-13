import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNiveauEtudeComponent } from './add-niveau-etude.component';

describe('AddNiveauEtudeComponent', () => {
  let component: AddNiveauEtudeComponent;
  let fixture: ComponentFixture<AddNiveauEtudeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNiveauEtudeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNiveauEtudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
