import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetEventDetailsComponent } from './get-event-details.component';

describe('GetEventDetailsComponent', () => {
  let component: GetEventDetailsComponent;
  let fixture: ComponentFixture<GetEventDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetEventDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
