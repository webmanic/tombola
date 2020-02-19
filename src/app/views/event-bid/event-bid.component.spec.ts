import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventBidComponent } from './event-bid.component';

describe('EventBidComponent', () => {
  let component: EventBidComponent;
  let fixture: ComponentFixture<EventBidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventBidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
