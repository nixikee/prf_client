import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTicketBuyingHistoryComponent } from './list-ticket-buying-history.component';

describe('ListTicketBuyingHistoryComponent', () => {
  let component: ListTicketBuyingHistoryComponent;
  let fixture: ComponentFixture<ListTicketBuyingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTicketBuyingHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListTicketBuyingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
