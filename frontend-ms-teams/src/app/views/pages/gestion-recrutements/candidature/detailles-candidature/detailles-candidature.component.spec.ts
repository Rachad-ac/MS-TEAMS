import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaillesCandidatureComponent } from './detailles-candidature.component';

describe('DetaillesCandidatureComponent', () => {
  let component: DetaillesCandidatureComponent;
  let fixture: ComponentFixture<DetaillesCandidatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaillesCandidatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetaillesCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
