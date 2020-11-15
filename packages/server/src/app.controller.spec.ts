import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AuthService } from './auth/auth.service'
import { AuthModule } from './auth/auth.module'

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    process.env.JWT_SECRET = 'TEST_SECRET'
    const app: TestingModule = await Test.createTestingModule({
                                           imports: [AuthModule],
                                           controllers: [AppController],
                                           providers: [AuthService]
                                         })
                                         .compile()

    appController = app.get<AppController>(AppController)
  })

  describe('root', () => {
    it('should ...', () => {
    })
  })
})
