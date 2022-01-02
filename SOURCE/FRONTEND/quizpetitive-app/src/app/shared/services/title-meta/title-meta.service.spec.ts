import { TestBed } from '@angular/core/testing';

import { TitleMetaService } from './title-meta.service';

describe('TitleMetaService', () => {
  let service: TitleMetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitleMetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
