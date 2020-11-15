import { Injectable } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'

@Injectable()
export class SyncSchedulerService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {
  }

  getSchedules() {
    this.schedulerRegistry.getIntervals()
  }
}
