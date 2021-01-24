import { Test, TestingModule } from '@nestjs/testing';
import { SchedulerRegistry } from '@nestjs/schedule';
import { SyncSchedulerService } from './sync-scheduler.service';

describe('SyncSchedulerService', () => {
  let service: SyncSchedulerService;
  let registry: SchedulerRegistry;

  beforeEach(async () => {
    registry = new SchedulerRegistry();
    service = new SyncSchedulerService(registry);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
