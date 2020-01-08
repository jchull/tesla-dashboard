import { Test, TestingModule } from '@nestjs/testing';
import { Local.StrategyService } from './local.strategy.service';

describe('Local.StrategyService', () => {
  let service: Local.StrategyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Local.StrategyService],
    }).compile();

    service = module.get<Local.StrategyService>(Local.StrategyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
