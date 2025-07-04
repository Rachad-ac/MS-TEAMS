import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditEmployeComponent } from './add-edit-employe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('AddEditEmployeComponent', () => {
  let component: AddEditEmployeComponent;
  let fixture: ComponentFixture<AddEditEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditEmployeComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [ NgbActiveModal ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
