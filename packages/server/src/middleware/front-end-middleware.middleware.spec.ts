import { FrontEndMiddlewareMiddleware } from './front-end-middleware.middleware'

describe('FrontEndMiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new FrontEndMiddlewareMiddleware())
      .toBeDefined()
  })
})
