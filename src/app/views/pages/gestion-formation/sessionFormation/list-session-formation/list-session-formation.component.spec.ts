import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSessionFormationComponent } from './list-session-formation.component';

describe('ListSessionFormationComponent', () => {
  let component: ListSessionFormationComponent;
  let fixture: ComponentFixture<ListSessionFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSessionFormationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSessionFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
