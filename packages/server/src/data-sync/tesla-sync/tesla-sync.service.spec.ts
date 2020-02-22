import { Test, TestingModule } from '@nestjs/testing';
import { TeslaSyncService } from './tesla-sync.service';

describe('TeslaSyncService', () => {
  let service: TeslaSyncService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeslaSyncService]
    }).compile();

    service = module.get<TeslaSyncService>(TeslaSyncService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
