import { TestBed } from '@angular/core/testing';

import { ProjectdataService } from './projectdata.service';

describe('ProjectdataService', () => {
  let service: ProjectdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
