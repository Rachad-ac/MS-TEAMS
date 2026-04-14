import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaillesCandidatComponent } from './detailles-candidat.component';

describe('DetaillesCandidatComponent', () => {
  let component: DetaillesCandidatComponent;
  let fixture: ComponentFixture<DetaillesCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaillesCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetaillesCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
