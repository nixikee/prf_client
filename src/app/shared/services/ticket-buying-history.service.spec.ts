import { TestBed } from '@angular/core/testing';

import { TicketBuyingHistoryService } from './ticket-buying-history.service';

describe('TicketBuyingHistoryService', () => {
  let service: TicketBuyingHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketBuyingHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
