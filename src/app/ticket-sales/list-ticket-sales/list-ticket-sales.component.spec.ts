import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTicketSalesComponent } from './list-ticket-sales.component';

describe('ListTicketSalesComponent', () => {
  let component: ListTicketSalesComponent;
  let fixture: ComponentFixture<ListTicketSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTicketSalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListTicketSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
