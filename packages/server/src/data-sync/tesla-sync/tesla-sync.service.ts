import { Injectable } from '@nestjs/common'
import { query, schema, types, tesla } from '@teslapp/common'
import { TeslaAccountService } from '../../tesla-account/tesla-account.service'
import { TeslaOwnerService } from '../../tesla-account/tesla-owner/tesla-owner.service'
import { ProductService } from '../../product/product.service'
import { SessionService } from '../../session/session.service'

@Injectable()
export class TeslaSyncService {
  constructor(
    private readonly productService: ProductService,
    private readonly sessionService: SessionService,
    private readonly teslaOwnerService: TeslaOwnerService,
    private readonly teslaAccountService: TeslaAccountService
  ) {
  }

  async syncVehicle(vin: string): Promise<any> {
    const product = await this.productService.findByVin(vin)
    if (!product) {
      throw new Error('Invalid state, ensure products exist before updating data!')
    } else {
      const teslaAccounts = await this.teslaAccountService.getTeslaAccounts(
        product.username,
        product._id
      )
      // we should not have more than one result when providing both parameters
      if (teslaAccounts?.length === 1) {
        const vehicleData = await this.teslaOwnerService.getVehicleData(
          teslaAccounts[0],
          product.id_s
        )

        if (vehicleData) {
          const vehicleStatus = this.findVehicleState(vehicleData)
          console.log(`${vehicleData.display_name} is currently ${vehicleStatus}`)

          // TODO: add time to query so we only find active session, sort by time descending
          // TODO: also limit to activity type>?
          const activeSession = (
            await this.sessionService.findSessions(product.username, {
              predicates: [
                { operator: query.Operator.EQ, value: product, field: 'vehicle' }
              ],
              page: { size: 1, start: 0 }
            })
          )?.results
          return activeSession?.length === 1 ?
            this.appendVehicleState(activeSession[0], vehicleData)
            :
            this.createNewActivity(vehicleData)
        }
      }
    }
  }

  private async appendVehicleState(
    session: schema.VehicleSessionType,
    vehicleData: tesla.VehicleData
  ): Promise<any> {
    //TODO: build state from vehicle data
    // then update session roll-up fields
  }

  private async createNewActivity(vehicleData: tesla.VehicleData): Promise<any> {
    //TODO:
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
