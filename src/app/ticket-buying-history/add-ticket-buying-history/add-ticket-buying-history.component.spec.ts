import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTicketBuyingHistoryComponent } from './add-ticket-buying-history.component';

describe('AddTicketBuyingHistoryComponent', () => {
  let component: AddTicketBuyingHistoryComponent;
  let fixture: ComponentFixture<AddTicketBuyingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTicketBuyingHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTicketBuyingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
