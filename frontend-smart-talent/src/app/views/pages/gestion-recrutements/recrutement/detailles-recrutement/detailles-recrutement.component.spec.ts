import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaillesRecrutementComponent } from './detailles-recrutement.component';

describe('DetaillesRecrutementComponent', () => {
  let component: DetaillesRecrutementComponent;
  let fixture: ComponentFixture<DetaillesRecrutementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaillesRecrutementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetaillesRecrutementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
