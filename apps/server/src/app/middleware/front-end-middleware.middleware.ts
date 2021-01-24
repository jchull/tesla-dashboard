import { Injectable, NestMiddleware } from '@nestjs/common'
import { join } from 'path'

@Injectable()
export class FrontEndMiddlewareMiddleware implements NestMiddleware {
  use(req, res, next) {
    const { baseUrl } = req
    if (baseUrl.indexOf('/api') === 0) {
      next()
    } else {
      const file = baseUrl.indexOf('/static') !== 0 ? 'index.html' : baseUrl
      console.log(`static: ${file}`)
      res.sendFile(join(__dirname, '../../../web', 'dist', file))
    }
  }
}
