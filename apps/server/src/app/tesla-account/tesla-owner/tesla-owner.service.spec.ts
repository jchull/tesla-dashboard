import { Test, TestingModule } from '@nestjs/testing'
import { TeslaOwnerService } from './tesla-owner.service'

describe('TeslaOwnerService', () => {
  let service: TeslaOwnerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeslaOwnerService],
    }).compile()

    service = module.get<TeslaOwnerService>(TeslaOwnerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
