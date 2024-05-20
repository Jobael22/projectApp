import { TestBed } from '@angular/core/testing';

import { MachineGroupService } from './machine-group.service';

describe('MachineGroupService', () => {
  let service: MachineGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MachineGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
