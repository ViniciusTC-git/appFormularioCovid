import { TestBed } from '@angular/core/testing';

import { PortariaService } from './portaria.service';

describe('PortariaService', () => {
  let service: PortariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortariaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
