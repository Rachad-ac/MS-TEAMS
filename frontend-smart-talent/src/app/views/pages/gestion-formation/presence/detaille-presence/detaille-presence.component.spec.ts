import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaillePresenceComponent } from './detaille-presence.component';

describe('DetaillePresenceComponent', () => {
  let component: DetaillePresenceComponent;
  let fixture: ComponentFixture<DetaillePresenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaillePresenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetaillePresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
