import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailleResultatComponent } from './detaille-resultat.component';

describe('DetailleResultatComponent', () => {
  let component: DetailleResultatComponent;
  let fixture: ComponentFixture<DetailleResultatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailleResultatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailleResultatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
