import { TestBed } from '@angular/core/testing';

import { TicketSalesService } from './ticket-sales.service';

describe('TicketSalesService', () => {
  let service: TicketSalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketSalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
