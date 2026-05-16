import { TestBed } from '@angular/core/testing';

import { WhatsappService } from './whatsapp';

describe('Whatsapp', () => {
  let service: WhatsappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhatsappService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
