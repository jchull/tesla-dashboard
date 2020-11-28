import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { query, tesla, types } from '@teslapp/common'
import { TeslaAccountService } from '../../tesla-account/tesla-account.service'
import { TeslaOwnerService } from '../../tesla-account/tesla-owner/tesla-owner.service'
import { ProductService } from '../../product/product.service'
import { SessionService } from '../../session/session.service'

@Injectable()
export class TeslaSyncService {
  constructor(
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
    @Inject(forwardRef(() => SessionService))
    private readonly sessionService: SessionService,
    @Inject(forwardRef(() => TeslaOwnerService))
    private readonly teslaOwnerService: TeslaOwnerService,
    @Inject(forwardRef(() => TeslaAccountService))
    private readonly teslaAccountService: TeslaAccountService
  ) {
  }

  async syncVehicle(id: string): Promise<any> {
    const product = await this.productService.findById(id)
    if (!product) {
      throw new Error('Invalid state, ensure products exist before updating data!')
    } else {
      const teslaAccounts = await this.teslaAccountService.getAccounts(product.username)
      // TODO: verify this is still true: we should not have more than one result when providing both parameters
      if (teslaAccounts?.length === 1) {
        const vehicleData = await this.teslaOwnerService.getVehicleData(
          teslaAccounts[0],
          product.id_s
        )

        // TODO: get from sync preferences
        const activityTimeoutSeconds = 300 // 5 minutes

        if (vehicleData) {
          const vehicleStatus = this.findVehicleState(vehicleData)
          console.log(`${vehicleData.display_name} is currently ${vehicleStatus}`)

          // TODO: add time to query so we only find active session, sort by time descending
          const activeSession = (
            await this.sessionService.findActivities(product.username, {
              predicates: [
                { operator: query.Operator.EQ, value: product, field: 'vehicle' },
                { operator: query.Operator.EQ, value: vehicleStatus, field: 'activity' },
                {
                  operator: query.Operator.GTE,
                  value: vehicleData.vehicle_state.timestamp - activityTimeoutSeconds,
                  field: 'end_date'
                }
              ],
              page: { size: 1, start: 0 }
            })
          )?.results
          return activeSession?.length === 1 ?
            this.sessionService.appendVehicleState(activeSession[0], vehicleData)
            :
            this.sessionService.createNewActivity(product, vehicleStatus, vehicleData)
        } else {
          console.error('unable to fetch vehicle data from Tesla')
        }
      }
    }
  }

  async syncVehiclesByAccount(username: string) {
    const accountList = await this.teslaAccountService.getAccounts(username)
    // TODO
  }


  private isCharging(vehicleData: tesla.VehicleData): boolean {
    return vehicleData.charge_state?.charging_state === 'Charging'
  }

  private isDriving(vehicleData: tesla.VehicleData): boolean {
    return vehicleData.charge_state?.charging_state?.length &&
      vehicleData.charge_state.charging_state !== 'Disconnected'
  }

  private findVehicleState(vehicleData: tesla.VehicleData): types.ActivityType {
    return this.isDriving(vehicleData) ?
      types.ActivityType.DRIVING
      :
      this.isCharging(vehicleData) ?
        types.ActivityType.CHARGING // todo: handle other states
        :
        types.ActivityType.PARKED
  }

  private isActive(vehicleData: tesla.VehicleData): boolean {
    return true // TODO: logic ya
  }
}
