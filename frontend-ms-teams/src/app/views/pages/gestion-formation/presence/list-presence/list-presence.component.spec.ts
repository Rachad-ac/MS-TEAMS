import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPresenceComponent } from './list-presence.component';

describe('ListPresenceComponent', () => {
  let component: ListPresenceComponent;
  let fixture: ComponentFixture<ListPresenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPresenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
