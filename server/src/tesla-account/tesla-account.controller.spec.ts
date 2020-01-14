import { Test, TestingModule } from '@nestjs/testing';
import { TeslaAccountController } from './tesla-account.controller';

describe('TeslaAccount Controller', () => {
  let controller: TeslaAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeslaAccountController]
    }).compile();

    controller = module.get<TeslaAccountController>(TeslaAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
