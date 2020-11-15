import { Test, TestingModule } from '@nestjs/testing'
import { SyncSchedulerService } from './sync-scheduler.service'

describe('SyncSchedulerService', () => {
  let service: SyncSchedulerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
                                              providers: [SyncSchedulerService]
                                            })
                                            .compile()

    service = module.get<SyncSchedulerService>(SyncSchedulerService)
  })

  it('should be defined', () => {
    expect(service)
      .toBeDefined()
  })
})
