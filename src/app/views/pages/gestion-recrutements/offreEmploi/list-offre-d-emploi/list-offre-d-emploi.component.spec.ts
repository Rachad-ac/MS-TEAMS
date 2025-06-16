import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOffreDEmploiComponent } from './list-offre-d-emploi.component';

describe('ListOffreDEmploiComponent', () => {
  let component: ListOffreDEmploiComponent;
  let fixture: ComponentFixture<ListOffreDEmploiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOffreDEmploiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOffreDEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
