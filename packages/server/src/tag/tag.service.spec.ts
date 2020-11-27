import { TagService } from './tag.service'

describe('TagService', () => {
  let service: TagService

  const mockModel = {}

  beforeEach(async () => {
    service = new TagService(mockModel)
  })

  it('should be defined', () => {
    expect(service)
      .toBeDefined()
  })
})
