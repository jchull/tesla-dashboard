import { Test, TestingModule } from '@nestjs/testing';
import { TeslaAccountService } from './tesla-account.service';

describe('TeslaAccountService', () => {
  let service: TeslaAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeslaAccountService]
    }).compile();

    service = module.get<TeslaAccountService>(TeslaAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
