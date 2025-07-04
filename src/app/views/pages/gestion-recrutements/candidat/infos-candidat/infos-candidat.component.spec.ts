import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosCandidatComponent } from './infos-candidat.component';

describe('InfosCandidatComponent', () => {
  let component: InfosCandidatComponent;
  let fixture: ComponentFixture<InfosCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfosCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfosCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
