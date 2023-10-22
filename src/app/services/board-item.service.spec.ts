import { TestBed } from '@angular/core/testing';

import { BoardItemService } from './board-item.service';

describe('BoardItemService', () => {
  let service: BoardItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
