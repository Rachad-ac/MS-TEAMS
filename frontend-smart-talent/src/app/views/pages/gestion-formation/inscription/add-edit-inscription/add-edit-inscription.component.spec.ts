import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditInscriptionComponent } from './add-edit-inscription.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('AddEditInscriptionComponent', () => {
  let component: AddEditInscriptionComponent;
  let fixture: ComponentFixture<AddEditInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditInscriptionComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [ NgbActiveModal ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
