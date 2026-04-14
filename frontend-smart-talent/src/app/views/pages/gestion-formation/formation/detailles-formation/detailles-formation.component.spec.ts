import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaillesFormationComponent } from './detailles-formation.component';

describe('DetaillesFormationComponent', () => {
  let component: DetaillesFormationComponent;
  let fixture: ComponentFixture<DetaillesFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaillesFormationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetaillesFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
