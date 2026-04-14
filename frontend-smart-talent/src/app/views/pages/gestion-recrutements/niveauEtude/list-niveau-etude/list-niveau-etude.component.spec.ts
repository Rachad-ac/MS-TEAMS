import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNiveauEtudeComponent } from './list-niveau-etude.component';

describe('ListNiveauEtudeComponent', () => {
  let component: ListNiveauEtudeComponent;
  let fixture: ComponentFixture<ListNiveauEtudeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNiveauEtudeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListNiveauEtudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
