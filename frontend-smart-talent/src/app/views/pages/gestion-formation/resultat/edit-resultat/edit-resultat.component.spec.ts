import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResultatComponent } from './edit-resultat.component';

describe('EditResultatComponent', () => {
  let component: EditResultatComponent;
  let fixture: ComponentFixture<EditResultatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditResultatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditResultatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
