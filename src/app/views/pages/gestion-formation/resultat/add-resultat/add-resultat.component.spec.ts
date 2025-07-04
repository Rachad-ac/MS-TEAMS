import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResultatComponent } from './add-resultat.component';

describe('AddResultatComponent', () => {
  let component: AddResultatComponent;
  let fixture: ComponentFixture<AddResultatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddResultatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddResultatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
