import { forwardRef, Module } from '@nestjs/common'
import { TeslaSyncService } from './tesla-sync/tesla-sync.service'
import { TeslaAccountModule } from '../tesla-account/tesla-account.module'
import { ProductModule } from '../product/product.module'
import { SessionModule } from '../session/session.module'
import { SyncSchedulerService } from './sync-scheduler/sync-scheduler.service'

@Module({
  imports: [TeslaAccountModule, SessionModule, forwardRef(() => ProductModule)],
  providers: [TeslaSyncService, SyncSchedulerService],
  exports: [TeslaSyncService],
})
export class DataSyncModule {}
