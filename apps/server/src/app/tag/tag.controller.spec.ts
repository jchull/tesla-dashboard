import { Test, TestingModule } from '@nestjs/testing'
import { TagController } from './tag.controller'

describe('Tag Controller', () => {
  let controller: TagController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [TagController],
    }).compile()

    controller = module.get<TagController>(TagController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})