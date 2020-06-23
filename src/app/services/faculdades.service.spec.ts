import { TestBed } from '@angular/core/testing';

import { FaculdadesService } from './faculdades.service';

describe('FaculdadesService', () => {
  let service: FaculdadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaculdadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
