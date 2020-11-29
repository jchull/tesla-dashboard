import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { tesla, types } from '@teslapp/common'
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

  async syncVehicle(id: string): Promise<types.Vehicle> {
    const product = await this.productService.findById(id)
    if (!product) {
      throw new Error('Invalid state, ensure products exist before updating data!')
    } else {
      const teslaAccounts = await this.teslaAccountService.getAccounts(product.username)
      // TODO: verify this is still true: we should not have more than one result when providing both parameters
      if (teslaAccounts?.length === 1) {

        try {
          const vehicleData = await this.teslaOwnerService.getVehicleData(
            teslaAccounts[0],
            product.id_s
          )

        product.odometer = vehicleData.vehicle_state.odometer
        product.charge_limit_soc = vehicleData.charge_state.charge_limit_soc
        product.battery_level = vehicleData.charge_state.battery_level
        product.charging_state = vehicleData.charge_state.charging_state
        product.timestamp = vehicleData.vehicle_state.timestamp

          // TODO: get from sync preferences
          const activityTimeoutSeconds = 300 // 5 minutes

          if (vehicleData) {
            const vehicleStatus = this.findVehicleState(vehicleData)
            console.log(`${vehicleData.display_name} is currently ${vehicleStatus}`)

            if (vehicleStatus === types.ActivityType.DRIVING || vehicleStatus === types.ActivityType.CHARGING) {
              const activeSession = await this.sessionService.findCurrentActivity(product, vehicleStatus,  vehicleData.vehicle_state.timestamp - activityTimeoutSeconds)
              activeSession ?
                await this.sessionService.appendVehicleState(activeSession, vehicleData)
                :
                await this.sessionService.createNewActivity(product, vehicleStatus, vehicleData)
            }
          } else {
            console.error('unable to fetch vehicle data from Tesla')
          }
        } catch (e) {
          // TODO: throws 408 timeout when vehicle sleeping
          console.error(JSON.stringify(e))
        }
        await this.productService.update(product)
        return product
      }
    }
  }

  async syncVehiclesByAccount(username: string) {
    const accountList = await this.teslaAccountService.getAccounts(username)
    console.log('TODO: implement upstream sync')
    // TODO
  }


  private isCharging(vehicleData: tesla.VehicleData): boolean {
    return vehicleData.charge_state?.charging_state === 'Charging'
  }

  private isDriving(vehicleData: tesla.VehicleData): boolean {
    return !!vehicleData.drive_state.shift_state
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

}
