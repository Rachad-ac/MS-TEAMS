import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecrutementComponent } from './list-recrutement.component';

describe('ListRecrutementComponent', () => {
  let component: ListRecrutementComponent;
  let fixture: ComponentFixture<ListRecrutementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRecrutementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRecrutementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
