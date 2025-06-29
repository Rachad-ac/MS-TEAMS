import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaillesEvaluationComponent } from './detailles-evaluation.component';

describe('DetaillesEvaluationComponent', () => {
  let component: DetaillesEvaluationComponent;
  let fixture: ComponentFixture<DetaillesEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaillesEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetaillesEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
