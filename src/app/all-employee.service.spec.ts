import { TestBed } from '@angular/core/testing';

import { AllEmployeeService } from './all-employee.service';

describe('AllEmployeeService', () => {
  let service: AllEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
