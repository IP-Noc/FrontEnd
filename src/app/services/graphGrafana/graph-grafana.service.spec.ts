import { TestBed } from '@angular/core/testing';

import { GraphGrafanaService } from './graph-grafana.service';

describe('GraphGrafanaService', () => {
  let service: GraphGrafanaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphGrafanaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
