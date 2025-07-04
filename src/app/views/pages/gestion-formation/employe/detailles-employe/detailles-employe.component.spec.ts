import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetaillesEmployeComponent } from './detailles-employe.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('DetaillesEmployeComponent', () => {
  let component: DetaillesEmployeComponent;
  let fixture: ComponentFixture<DetaillesEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaillesEmployeComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaillesEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
