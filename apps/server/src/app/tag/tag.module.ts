import { forwardRef, Module } from '@nestjs/common'
import { TagController } from './tag.controller'
import { SessionModule } from '../session/session.module'

@Module({
  imports: [forwardRef(() => SessionModule)],
  controllers: [TagController],
  providers: [],
  exports: [],
})
export class TagModule {}
